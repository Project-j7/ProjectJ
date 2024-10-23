import { useFirebaseUser } from "../../contextStore/firebaseUserContext";
import { useServerUser } from "../../contextStore/serverUserContext";

function Dashboard(){
    
    return(
        <div>
            <h1>Dashboard</h1>
            <div id="user-info"></div>
        </div>
    )
}

export default Dashboard;