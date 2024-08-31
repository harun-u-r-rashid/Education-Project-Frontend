import React from 'react'

function BaseFooter() {
  return (


    <>

    <footer>

<div className="waves">
  <div id='wave1' className="wave"></div>
  <div id='wave2' className="wave"></div>
  <div id='wave3' className="wave"></div>
  <div id='wave4' className="wave"></div>
</div>

<ul className="mt-5 social-icons">
  <li><a href=""><i class="fa-solid fa-video"></i></a></li>
  <li><a href=""><i class="fa-solid fa-code"></i></a></li>
  <li><a href=""><i class="fa-regular fa-envelope"></i></a></li>
  {/* <li><a href="">three</a></li>
  <li><a href="">four</a></li> */}
</ul>

<ul className='menu'>
  <li>
    <a className='text-uppercase' href="">Home</a>
    <a className='text-uppercase' href="">About</a>
    <a className='text-uppercase' href="">Privacy</a>
    <a className='text-uppercase' href="">Team</a>
    <a className='text-uppercase' href="">Contact</a>
  </li>
</ul>

<p className='text-light text-uppercase'><i className="text-light fa-regular fa-copyright"></i> Harunur</p>
</footer>
 
    </>



  )
}

export default BaseFooter