import buildClient from "../api/build-client"

function LandingPage({currentUser}){
   return currentUser ? <h1>you are signed in</h1> : <h1>you are not signed in</h1>
}

LandingPage.getInitialProps = async (context) =>{
    const { data } = await buildClient(context).get('/api/users/currentuser')  
    return data;   
}

export default LandingPage;