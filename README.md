# Advertisement Marketplace Project

Welcome to the **Advertisement Marketplace**, a platform that connects buyers and sellers of advertisement spaces like billboards and walls. This project is divided into two repositories: **Frontend** and **Backend**.

---

## 🛠 Tech Stack
- **Supabase** - Database management
- **Node.js & Express** - Backend server and API development
- **Cloudinary** - Image storage and management
- **Razorpay** - Payment gateway integration
- **JWT (JSON Web Tokens)** - Secure authentication and session management
- **Cookies** - Storing JWT tokens securely on the client side
- **Ngrok** - Tunneling for webhook testing with Razorpay

---

## 🚀 Features
### Backend Features
1. **Authentication**
   - User registration with roles (Buyer/Seller)
   - Secure login/logout using JWT tokens
2. **Buying & Selling Advertisement Spaces**
   - Sellers can list available advertisement spaces (walls, billboards, etc.)
   - Buyers can explore and purchase ad spaces
3. **Payment Verification**
   - Integration with Razorpay for secure transactions
   - Webhook setup using Ngrok for testing payment success/failure callbacks
4. **Cloudinary Storage**
   - Efficient storage of uploaded advertisement space images
5. **Order Tracking**
   - Track the status and details of purchased advertisement spaces

### Frontend Features
- Responsive UI for buyers and sellers
- Dynamic forms for ad space listings and purchases
- Real-time updates on order status and payment verification
- Interactive dashboard for sellers to manage their listings

---

## 📂 Project Structure
### Backend Repository
```
📂 backend
 ├── 📂 src
 │   ├── 📂 controllers
 │   ├── 📂 routes
 │   ├── 📂 models
 │   ├── 📂 middleware
 │   ├── 📂 utils
 ├── 📂 config
 ├── server.js
```

### Frontend Repository
```
📂 frontend
 ├── 📂 src
 │   ├── 📂 components
 │   ├── 📂 pages
 │   ├── 📂 hooks
 │   ├── 📂 utils
 │   ├── App.js
```

---

## 🔧 Installation & Setup
### Backend
1. Clone the backend repository:
   ```bash
   git clone <backend-repo-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```env
   SUPABASE_URL=<your-supabase-url>
   SUPABASE_KEY=<your-supabase-key>
   CLOUDINARY_URL=<your-cloudinary-url>
   RAZORPAY_KEY_ID=<your-razorpay-key-id>
   RAZORPAY_KEY_SECRET=<your-razorpay-key-secret>
   JWT_SECRET=<your-jwt-secret>
   COOKIE_SECRET=<your-cookie-secret>
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Frontend
1. Clone the frontend repository:
   ```bash
   git clone <frontend-repo-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```env
   VITE_API_URL=<your-backend-api-url>
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

---

## 📈 Future Scope and Improvements
- **Enhanced Analytics:** Detailed insights for sellers about ad performance and views.
- **User Reviews & Ratings:** Allow buyers to review ad spaces to help others make informed decisions.
- **Automated Invoicing System:** Generating invoices for all successful purchases.
- **AI-Driven Recommendations:** Suggesting ideal advertisement spaces based on buyer preferences.
- **Advanced Search & Filters:** Improved search functionality for precise ad space selection.
- **Multi-language Support:** Expanding reach to a global audience with localized content.

---

## 🤝 Contributing
We welcome contributions! Feel free to fork the repo and submit pull requests for new features or bug fixes.

---

## 📄 License
This project is licensed under the **MIT License**.

---

## 📬 Contact
If you have any questions or suggestions, feel free to reach out.

Happy Coding! 🚀

