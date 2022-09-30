import jwt from "jsonwebtoken"

const secret_key = "nextmarket"

const auth = (handler) => {
  return async(req, res) => {
    if(req.method === "GET"){
      return handler(req, res)
    }
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvQG1vbm90ZWluLmNvbSIsImlhdCI6MTY2NDQ2OTQ1OSwiZXhwIjoxNjY0NTUyMjU5fQ.KC8cYCR0O6FQn6tP98vS5TpJFOL46yzhk4iAtpGIAC4"
    // const token = await req.headers.authorization.split(" ")[1]

    if(!token){
      return res.status(401).json({message: "トークンがありません"})
    }
    try{
      const decoded =jwt.verify(token, secret_key)
      req.body.email = decoded.email
      return handler(req, res)
    }catch(err){
      return res.status(401).json({message: "トークンが正しくないので、ログインしてください"})
    }
  }
}

export default auth