import React from 'react'
import '../Header/index.css';


const Navbar = () => {

    
    return(
        <div>
            <div className='main-nav'>
                <div className='logo'> 
                    <h2> 
                        Argu<span>Mentor</span>
                    </h2>
                </div>
                <div className='menu-link'> 
                <ul>
                        <li>
                        <a href="/">Home</a>
                        </li>
                        <li>
                        <a href="debate">Practice</a>
                        </li>
                    
                        <li>
                        <a href="evifinder">EviSearch</a>
                        </li>

                        

                        <li>
                            <a href="signup">
                                Sign Up
                            </a>
                        </li>
                        
                        <li className="a">
                        <a href="signin" className="bg-orange-500 border border-orange px-4 py-2 rounded-md text-black hover:bg-dark-orange transition-all duration-300" >Sign In</a>
                        </li>

                </ul>
                </div>
                </div>
                {/* <section className='hero-section'>
                    <p></p>

                </section> */}
        </div>

        
    )
}

export default Navbar;

