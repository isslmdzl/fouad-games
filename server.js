const express=require("express"),fs=require("fs"),path=require("path"),crypto=require("crypto");
const app=express(),PORT=process.env.PORT||3000;
// تم تحديث كلمة السر هنا إلى 07isslam
const ADMIN_PASSWORD=process.env.ADMIN_PASSWORD||"07isslam";

const data=path.join(__dirname,"data"),file=path.join(data,"orders.json");fs.mkdirSync(data,{recursive:true});if(!fs.existsSync(file))fs.writeFileSync(file,"[]");
app.use(express.json({limit:"2mb"}));app.use(express.static(__dirname));
const read=()=>JSON.parse(fs.readFileSync(file,"utf8")),write=x=>fs.writeFileSync(file,JSON.stringify(x,null,2));
const auth=(q,s,n)=>q.get("x-admin-password")===ADMIN_PASSWORD?n():s.status(401).send("Unauthorized");

app.post("/api/orders",(q,s)=>{let x=q.body||{};if(!x.name||!x.phone||!Array.isArray(x.games)||!x.games.length)return s.status(400).send("Missing data");let a=read(),code;do{code="FG-"+crypto.randomInt(100000,1000000)}while(a.some(o=>o.code===code));let o={code,name:String(x.name),phone:String(x.phone),games:x.games,total:Number(x.total)||0,createdAt:x.createdAt||new Date().toISOString(),status:"جديد"};a.push(o);write(a);s.json(o)});
app.get("/api/orders",(q,s)=>{let p=String(q.query.phone||"");if(!p)return s.status(400).send("Phone required");s.json(read().filter(o=>o.phone===p).map(o=>({code:o.code,games:o.games,total:o.total,createdAt:o.createdAt,status:o.status})))});
app.get("/api/admin/orders",(q,s)=>auth(q,s,()=>s.json(read().slice().reverse())));
app.patch("/api/admin/orders/:code",(q,s)=>auth(q,s,()=>{let a=read(),o=a.find(x=>x.code===q.params.code);if(!o)return s.status(404).send("Not found");o.status=String(q.body.status||"جديد");write(a);s.json(o)}));
app.delete("/api/admin/orders/:code",(q,s)=>auth(q,s,()=>{write(read().filter(o=>o.code!==q.params.code));s.json({ok:true})}));
app.listen(PORT,()=>console.log("Fouad Games: http://localhost:"+PORT));
