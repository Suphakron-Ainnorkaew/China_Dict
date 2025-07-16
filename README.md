# Chinese-Thai Dictionary (中泰词典)

## ภาพรวมโปรเจค

โปรเจคนี้คือเว็บแอปพลิเคชัน "พจนานุกรมภาษาจีน-ไทย" ที่ช่วยให้ผู้ใช้สามารถค้นหาคำศัพท์ภาษาจีน-ไทย ดูความหมาย ตัวอย่างการใช้ และเล่นเกมทายคำศัพท์เพื่อฝึกฝนภาษาได้อย่างสนุกสนาน มีระบบสมาชิกเพื่อจัดการโปรไฟล์และสิทธิ์การเข้าถึงข้อมูล

ระบบแบ่งออกเป็น 2 ส่วนหลัก:
- **Frontend (หน้าบ้าน):** ส่วนติดต่อผู้ใช้
- **Backend (หลังบ้าน):** ส่วน API และฐานข้อมูล

---

## เทคโนโลยีที่ใช้

### 1. Frontend (หน้าบ้าน)
- **ภาษา:** JavaScript (ES6+)
- **เฟรมเวิร์กหลัก:** [Vue 3](https://vuejs.org/) (Single Page Application)
- **State Management:** [Pinia](https://pinia.vuejs.org/)
- **Router:** [Vue Router](https://router.vuejs.org/)
- **UI Framework:** [Tailwind CSS](https://tailwindcss.com/) (utility-first CSS)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **เหตุผลที่เลือก:** Vue 3 ใช้งานง่าย เรียนรู้ไว เหมาะกับ SPA, Tailwind CSS ทำให้พัฒนา UI ได้รวดเร็วและสวยงาม, Vite ช่วยให้ dev/build เร็วมาก

### 2. Backend (หลังบ้าน)
- **ภาษา:** JavaScript (Node.js)
- **เฟรมเวิร์กหลัก:** [Express.js](https://expressjs.com/)
- **ฐานข้อมูล:** [MongoDB](https://www.mongodb.com/) (NoSQL)
- **ORM:** [Mongoose](https://mongoosejs.com/)
- **Authentication:** JWT (JSON Web Token)
- **เหตุผลที่เลือก:** Node.js/Express.js เหมาะกับ REST API, ทำงานร่วมกับ MongoDB ได้ดี, Mongoose ช่วยจัดการ schema, JWT ใช้ยืนยันตัวตนแบบ stateless

---

## โครงสร้างข้อมูล

### User (ผู้ใช้)
- username, password (hash), email, gender, age, role (general/pro), created_at

### Word (คำศัพท์)
- chinese, pinyin, thai_pronunciation, thai_meaning, part_of_speech, category, example_usage, created_at, updated_at

---

## ฟีเจอร์หลัก

- **ค้นหาคำศัพท์จีน-ไทย:** ค้นหาด้วยตัวอักษรจีน พินอิน หรือคำแปลไทย
- **แสดงรายละเอียดคำศัพท์:** พร้อมตัวอย่างการใช้
- **ระบบสมาชิก:** สมัคร, ล็อกอิน, แก้ไขรหัสผ่าน, ดูโปรไฟล์
- **เกมทายคำศัพท์:** ฝึกทักษะภาษาแบบ interactive
- **สิทธิ์การเข้าถึง:** ผู้ใช้ทั่วไป/Pro (จำนวนคำที่เข้าถึงได้ต่างกัน)
- **Responsive UI:** รองรับมือถือและเดสก์ท็อป

---

## การเชื่อมต่อระหว่าง Frontend และ Backend

- Frontend เรียกใช้งาน API จาก Backend ผ่าน HTTP (RESTful API)
- ใช้ JWT ในการยืนยันตัวตน (token จะถูกเก็บใน localStorage)
- ทุก endpoint ที่ต้องการข้อมูลผู้ใช้จะต้องแนบ Authorization header

---

## การจัดการฐานข้อมูล

- ใช้ MongoDB (NoSQL) เหมาะกับข้อมูลที่ยืดหยุ่นและขยาย schema ได้ง่าย
- เชื่อมต่อผ่าน Mongoose ORM

---

## วิธีการติดตั้งและใช้งาน

### Backend
```bash
cd backend
npm install
# ตั้งค่า .env ให้มี MONGODB_URI และ JWT_SECRET
node server.js
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```
- สามารถ build production ได้ด้วย `npm run build`

---

## หมายเหตุ

- ระบบนี้ออกแบบมาเพื่อการเรียนรู้และฝึกฝนภาษาจีน-ไทย
- สามารถนำไปต่อยอดเพิ่มฟีเจอร์ เช่น เพิ่มหมวดหมู่คำศัพท์, ระบบแจ้งเตือน, หรือระบบ leaderboard ได้

---

## สรุป

- **หน้าบ้าน**: Vue 3, Tailwind CSS, Vite (JavaScript)
- **หลังบ้าน**: Node.js, Express.js, MongoDB, Mongoose (JavaScript)
- **ฐานข้อมูล**: MongoDB
- **เหตุผล**: ทุกเทคโนโลยีเลือกมาเพื่อความง่ายในการพัฒนา, ขยายระบบ, และรองรับผู้ใช้จำนวนมาก


