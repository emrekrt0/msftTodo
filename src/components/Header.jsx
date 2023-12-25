import { Link } from "react-router-dom"
import { useState } from "react"
import { createClient } from '@supabase/supabase-js';
import settingsIcon from '../assets/static/settings.svg';
import helpIcon from '../assets/static/help-circle.svg';
import annIcon from '../assets/static/bullhorn-solid.svg';
import waffleIcon from '../assets/static/waffle-icon.svg';

const supabase = createClient(
    'https://pabase.co',
    'eyJhbGciOMiOiJzdXBhYmFzZSIsInJlZiI6ImpvcHVocmxvZWtrbW95dG51am1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMyMzg4OTMsImV4cCI6MjAxODgxNDg5M30.fs4Glk5dtLG80qIyN8fBJGw3jlgwwv4ff6n5B32yJ8E'
  );

export default function Header() {
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState([]);

    
    supabase.auth.onAuthStateChange((event, session) => {
        if (session) {
        setIsLogged(true);
        setUser(session.user.user_metadata.name);
        } else {
            setIsLogged(false);
        }
    })

    async function logOut() {
        await supabase.auth.signOut();
        setUser([]);
        window.location.reload();
    }

    return(
        <>
        <div className="header">
            <div className="header_left">
                <div className="otherApps">
                    <img src={waffleIcon} alt="" />
                </div>
            </div>

            <div className="header_center">
                <div className="header_text">
                    <h4>To Do</h4>
                </div>
                <div className="header_searchbar">
                    <input type="text" placeholder="Search your tasks" />
                </div>
                <div className="header_userSettings">
                <div className="settingsIcon">
                    <img src={settingsIcon} alt=""/>
                </div>
                <div className="helpIcon">
                    <img src={helpIcon} alt=""/>
                </div>
                <div className="annIcon">
                    <img src={annIcon} alt=""/>
                </div>
                </div>
            </div>

            <div className="header_right">
                <div className="header_user">
                    {isLogged ? <div> <button onClick={logOut}>Çıkış yap</button> <h2>{user}</h2> </div> : <Link to={`/signin`}><h4>Giriş Yap</h4></Link> }
                    
                </div>
            </div>
        </div>
        </>
    )
}