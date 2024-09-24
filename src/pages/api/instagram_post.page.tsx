     // api 
     import path from 'path';
     import { promises as fs } from 'fs';
import { fetchWithAxios } from './utils';
 
     const refresh_token = "IGQVJXLXBCN3lTRkV4NEx1alAxckRQc0tjd0p5azJ4SjUzV1ZAVaXhvazdxVXpNMGtFTENYRmJ3TExOOXZAnOW55RHJ0dHlPY1VkdEpTb0g2d0hMekp0RTJRQXhCNzlwc0p1VnVvYzltaDFvYS0yUmZAsMwZDZD";
     export default async function handler(req, res) {
       if (req.method === 'POST') {
         const jsonDirectory = path.join(process.cwd(), '/src/instagram_token');
         //Write the json data file data.json
         try{

        const fileContents = await fs.readFile(jsonDirectory + '/data.txt', 'utf8');
        const postdata = await instagramPostFetch(fileContents);
             //Return the content of the data file in json format
         res.status(200).json({ msg:"post fetch successfully", success:true,post:postdata});

         }
         catch(err){
          if(err?.code === "ERR_CANCELED"){
            res.status(200).send({msg:"Request Cancelled (Timeout)"})
          }else{
            res.status(500).send({ error: true, msg: err.message, post: [] });
          }
         }
       }
        else {
         res.status(400).json({msg:"Method not allowed"});
       }
     }

     const instagramPostFetch = async(instaToken) =>{
        const result = await fetchWithAxios(`https://graph.instagram.com/me/media?fields=id,media_url,permalink,media_type,caption&limit=8&access_token=${instaToken}`, 2000);
        const post = result?.data;
        if(post?.error){
            const token = await getNewToken();
            return instagramPostFetch(token);
        }
        else{
            return post;
        }
     }

     const getNewToken = async() =>{
        const jsonDirectory = path.join(process.cwd(), '/src/instagram_token');
        const result = await fetchWithAxios(`https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${refresh_token}`,2000);
        const data =  result?.data;
        const fileContents = await fs.writeFile(
            jsonDirectory + '/data.txt',
            data?.access_token,
            'utf8'
          );
        return data?.access_token;
     } 