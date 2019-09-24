//JWT모듈을 추가한다.
const jwt = require('jsonwebtoken');

//JWT 토큰 유효성 검사 공통모듈
exports.verifyToken = (req,res,next) =>{

    try{
        //jwt.verify메소드('브라우저에서 전달되는 토큰','서버에 저장해둔 토큰 발급인증키값')로 토큰 유효성을 검사한다.
        //jwt.verify메소드는 실행 후 토큰내 페이로드에 저장되어있는 사용자 정보를 디코딩해서 반환합니다.
        //검사 후 반환되는 디코디드된 사용자 저장값을 req.decoded에 저장한다.
        req.decoded = jwt.verify(req.headers.authorization,process.env.JWT_SECRET);
        return next();    
    }catch(err){  
        if(err.name === 'TokenExpiredError'){ //기한이 지난 토큰인 경우
            return res.status(419).json({
                code:419,
                message:'토큰이 만료되었습니다.'
            });
        }
        return res.status(401).json({
            code:401,
            message:'유효하지 않은 토큰입니다.'
        });
    }
};
