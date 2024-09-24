import {createTokenWithTruecallerMutation } from "./queries";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const endPoint = req.body?.endpoint;
    const accessToken = req.body?.accessToken;
    const requestId = req.body?.requestId;

    if (endPoint && accessToken) {
      const options = {
        headers: { "content-type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          query: createTokenWithTruecallerMutation(
            accessToken,
            endPoint,
            requestId
          ),
        })
      };
      if(accessToken && endPoint && requestId){
        try {
          const result = await fetch(
            process.env.NEXT_PUBLIC_API_URI,
            options
          );
          const data = await result.json();
          console.log("Truecaller signup", data);
          return res.status(200).json({message: "Profile created successfully"});
        } catch (err) {
          console.log("Truecaller signup error",err);
          return res.status(200).json({message: "Encountered error in creating profile."});
        }
      } else {
        return res.status(200).json({message: "requestId not provided"});
      }
    } else {
      return res.status(200).json({message: "Accesstoken or endpoint not provided"});
    }
  } else {
    // Handle any other HTTP method
    return res.status(200).json({message: "Get request not handled"});
  }
}
