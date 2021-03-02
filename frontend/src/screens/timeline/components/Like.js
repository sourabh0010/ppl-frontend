import Url from "../../../util/Config";
import axios from "axios";
 //function for like and dislike a single post
const like={
    Makelikes:async (postId,userId)=>{
       return await axios
        .post(`${Url.baseurl}/upload/like`, { _id: postId, userId: userId })
        .then((res) => {
            return res
        
        });   
     },
   
     
}
export default like