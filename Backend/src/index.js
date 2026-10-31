import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import UserModel from "./model/usermodel.js";
import cors from "cors"
import ShoeModel from "./model/shoeModel.js";
import ProductModel from "./model/productModel.js";
import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors("*"))

// Connect Database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongourl);
    console.log("✅ Database Connected");
  } catch (error) {
    console.error("❌ Database Connection Failed:", error.message);
    process.exit(1);
  }
};

connectDB();

// Register Route
app.post("/register", async (req, res) => {
  try {
    const { name, email, password, conformpassword } = req.body;

    // Validation
    if (!name || !email || !password || !conformpassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Password Match
    if (password !== conformpassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // Check Existing User
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});


// Login Route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    // Check User
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Compare Password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    // Login Success
    return res.status(200).json({
      success: true,
      message: "Login Successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

app.post("/users", async (req, res) => {
  try {
    const { name, email, password, conformpassword } = req.body;

    if (!name || !email || !password || !conformpassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password !== conformpassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const userData = user.toObject();
    delete userData.password;

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: userData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const { name, email, password, conformpassword } = req.body;
    const updateData = {};

    if (name) updateData.name = name;

    if (email) {
      const existingUser = await UserModel.findOne({
        email,
        _id: { $ne: req.params.id },
      });

      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "Email already in use",
        });
      }

      updateData.email = email;
    }

    if (password || conformpassword) {
      if (password !== conformpassword) {
        return res.status(400).json({
          success: false,
          message: "Passwords do not match",
        });
      }

      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

app.get("/users/:id/cart", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id).select("cart");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, cart: user.cart });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.post("/users/:id/cart", async (req, res) => {
  try {
    const { productId, name, image, price, quantity = 1, category = "" } = req.body;

    if (!productId || !name || !image || price == null) {
      return res.status(400).json({ success: false, message: "Product data is required" });
    }

    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const existingItem = user.cart.find((item) => item.productId === productId);
    if (existingItem) {
      existingItem.quantity = existingItem.quantity + quantity;
    } else {
      user.cart.push({ productId, name, image, price, quantity, category });
    }

    await user.save();
    return res.status(200).json({ success: true, message: "Cart updated", cart: user.cart });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.delete("/users/:id/cart/:itemId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.cart = user.cart.filter((item) => item._id.toString() !== req.params.itemId);
    await user.save();
    return res.status(200).json({ success: true, message: "Cart item removed", cart: user.cart });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.get("/users/:id/wishlist", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id).select("wishlist");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, wishlist: user.wishlist });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.post("/users/:id/wishlist", async (req, res) => {
  try {
    const { productId, name, image, price, category = "" } = req.body;

    if (!productId || !name || !image || price == null) {
      return res.status(400).json({ success: false, message: "Product data is required" });
    }

    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const exists = user.wishlist.some((item) => item.productId === productId);
    if (!exists) {
      user.wishlist.push({ productId, name, image, price, category });
      await user.save();
    }

    return res.status(200).json({ success: true, message: "Wishlist updated", wishlist: user.wishlist });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.delete("/users/:id/wishlist/:itemId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.wishlist = user.wishlist.filter((item) => item._id.toString() !== req.params.itemId);
    await user.save();
    return res.status(200).json({ success: true, message: "Wishlist item removed", wishlist: user.wishlist });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});
app.put("/users/:id/cart/:itemId", async (req, res) => {
  try {
    const { action } = req.body;

    const user = await UserModel.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const item = user.cart.id(req.params.itemId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    if (action === "increase") {
      item.quantity += 1;
    }

    if (action === "decrease") {
      if (item.quantity > 1) {
        item.quantity -= 1;
      }
    }

    await user.save();

    res.status(200).json({
      success: true,
      cart: user.cart,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

// Home Route
app.get("/", (req, res) => {
  res.send("Server is Running...");
});

// Start Server
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Shoe model
app.post("/shoes", async (req, res) => {
  try {
    const { name, image, price } = req.body;

    if (!name || !image || !price) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const shoe = await ShoeModel.create({
      name,
      image,
      price,
    });

    res.status(201).json({
      success: true,
      message: "Shoe Added Successfully",
      shoe,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});
app.get("/shoes", async (req, res) => {
  try {
    const shoes = await ShoeModel.find();

    res.status(200).json({
      success: true,
      shoes,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});
// product model
app.post("/products", async (req, res) => {
  try {
    const { name, image, price, category } = req.body;

    if (!name || !image || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const product = await ProductModel.create({
      name,
      image,
      price,
      category,
    });

    res.status(201).json({
      success: true,
      message: "Product Added Successfully",
      product,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

const createCategoryPostRoute = (path, categoryName) => {
  app.post(path, async (req, res) => {
    try {
      const { name, image, price } = req.body;

      if (!name || !image || !price) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }

      const product = await ProductModel.create({
        name,
        image,
        price,
        category: categoryName,
      });

      res.status(201).json({
        success: true,
        message: `${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Added Successfully`,
        product,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  });
};

createCategoryPostRoute("/hats", "hats");
createCategoryPostRoute("/jackets", "jackets");
createCategoryPostRoute("/tshirts", "tshirts");

app.get("/products", async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category
      ? { category: category.toString().toLowerCase().trim() }
      : {};

    const products = await ProductModel.find(filter);

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

const createCategoryRoute = (path, categoryName) => {
  app.get(path, async (req, res) => {
    try {
      const products = await ProductModel.find({
        category: categoryName.toLowerCase(),
      });

      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  });
};

createCategoryRoute("/hats", "hats");
createCategoryRoute("/jackets", "jackets");
createCategoryRoute("/tshirts", "tshirts");

app.delete("/products/:id", async (req, res) => {
  try {
    const deleted = await ProductModel.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      product: deleted,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

const createCategoryDeleteRoute = (path) => {
  app.delete(`${path}/:id`, async (req, res) => {
    try {
      const deleted = await ProductModel.findByIdAndDelete(req.params.id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Item not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Item deleted successfully",
        item: deleted,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  });
};

createCategoryDeleteRoute("/hats");
createCategoryDeleteRoute("/jackets");
createCategoryDeleteRoute("/tshirts");
