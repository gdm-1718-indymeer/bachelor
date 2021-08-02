import React from 'react'
import { Link } from 'react-router-dom';


const Settings = () => {
    return (
        

        <div class="wrapper">
        <div class="dashboard">
          
          <div class="dashboard__header">
            <h1>SETTINGS</h1>
            <p>Verander je profiel settings hier.</p>
          </div>
          
          <div class="dashboard__main">
            <div class="row">
              
              <div class="dashboard-main__item">
                <h5><i class="fas fa-bolt"></i> Volgende inname in:</h5>
                <h4>3:32 </h4>
              </div>
              
              <Link to="/settings/profile" className="dashboard-main__item">
                <div>
                  <div className='dashboard-main__item__profile'>
                  <svg xmlns="http://www.w3.org/2000/svg"  width="30.391" height="42.197" viewBox="0 0 30.391 42.197">
                      <g id="Icons_nurse" data-name="Icons/ nurse" transform="translate(1.697 1.5)">
                        <g id="Icons_nurse-2" data-name="Icons/ nurse">
                          <path id="Path" d="M15,5.25A5.315,5.315,0,0,0,9.75,0,5.315,5.315,0,0,0,4.5,5.25,2.307,2.307,0,0,0,2.25,3,2.307,2.307,0,0,0,0,5.25V13.5a6,6,0,0,0,12,0V9h3Z" transform="translate(7.5)" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3"/>
                          <path id="Path-2" data-name="Path" d="M10.5,0V1.5A5.975,5.975,0,0,1,7.2,6.9l-3,1.5a6.208,6.208,0,0,0-3.15,4.5L0,20.25" transform="translate(0 18.75)" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3"/>
                          <path id="Path-3" data-name="Path" d="M0,.75H4.5" transform="translate(16.5 32.25)" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3"/>
                          <path id="Path-4" data-name="Path" d="M17.25,16.05,16.2,8.55a6.208,6.208,0,0,0-3.15-4.5L6.75.9l-3,1.65L0,0" transform="translate(9.75 22.95)" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3"/>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <h5> Profiel</h5>
                </div>
              </Link>
            
              
              <Link to="/settings/calendar" className="dashboard-main__item">
                  <div className='dashboard-main__item__calendar'>
                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50"><path d="M 12 0 C 10.90625 0 10 0.90625 10 2 L 10 4 L 4 4 C 3.59375 4 3.148438 4.0625 2.722656 4.359375 C 2.296875 4.65625 2 5.246094 2 5.792969 L 2 46.042969 C 2 46.542969 2.171875 47.054688 2.53125 47.425781 C 2.886719 47.800781 3.410156 48 3.917969 48 L 46.082031 48 C 46.589844 48 47.113281 47.800781 47.46875 47.425781 C 47.828125 47.054688 48 46.542969 48 46.042969 L 48 5.792969 C 48 5.246094 47.703125 4.65625 47.277344 4.359375 C 46.851563 4.0625 46.40625 4 46 4 L 40 4 L 40 2 C 40 0.90625 39.09375 0 38 0 L 36 0 C 34.90625 0 34 0.90625 34 2 L 34 4 L 16 4 L 16 2 C 16 0.90625 15.09375 0 14 0 Z M 12 2 L 14 2 L 14 8 L 12 8 Z M 36 2 L 38 2 L 38 8 L 36 8 Z M 4 6 L 10 6 L 10 8 C 10 9.09375 10.90625 10 12 10 L 14 10 C 15.09375 10 16 9.09375 16 8 L 16 6 L 34 6 L 34 8 C 34 9.09375 34.90625 10 36 10 L 38 10 C 39.09375 10 40 9.09375 40 8 L 40 6 L 46 6 L 46 13 L 4 13 Z M 4 15 L 46 15 L 46 46 L 4 46 Z M 29.621094 23.171875 C 28.941406 23.171875 28.347656 23.296875 27.839844 23.542969 C 27.328125 23.789063 26.890625 24.128906 26.535156 24.5625 C 26.179688 24.992188 25.914063 25.503906 25.734375 26.097656 C 25.558594 26.695313 25.46875 27.335938 25.46875 28.03125 L 27.433594 28.03125 C 27.441406 27.589844 27.484375 27.175781 27.5625 26.792969 C 27.632813 26.410156 27.75 26.074219 27.90625 25.792969 C 28.058594 25.511719 28.265625 25.289063 28.523438 25.125 C 28.78125 24.964844 29.105469 24.886719 29.496094 24.886719 C 29.921875 24.886719 30.265625 24.960938 30.53125 25.109375 C 30.792969 25.257813 31 25.445313 31.152344 25.667969 C 31.300781 25.890625 31.398438 26.128906 31.453125 26.386719 C 31.503906 26.644531 31.53125 26.886719 31.53125 27.113281 C 31.515625 27.605469 31.398438 28.042969 31.167969 28.421875 C 30.9375 28.800781 30.644531 29.152344 30.289063 29.472656 C 29.933594 29.796875 29.542969 30.101563 29.117188 30.382813 C 28.691406 30.664063 28.285156 30.957031 27.894531 31.253906 C 27.078125 31.832031 26.4375 32.507813 25.96875 33.289063 C 25.496094 34.070313 25.253906 34.980469 25.246094 36.027344 L 33.472656 36.027344 L 33.472656 34.1875 L 27.605469 34.1875 C 27.683594 33.914063 27.832031 33.652344 28.050781 33.40625 C 28.269531 33.160156 28.523438 32.921875 28.816406 32.695313 C 29.109375 32.46875 29.429688 32.238281 29.773438 32.011719 C 30.117188 31.785156 30.460938 31.546875 30.808594 31.292969 C 31.152344 31.039063 31.484375 30.769531 31.804688 30.484375 C 32.125 30.195313 32.414063 29.878906 32.667969 29.535156 C 32.917969 29.195313 33.121094 28.820313 33.269531 28.410156 C 33.417969 28.003906 33.492188 27.550781 33.492188 27.046875 C 33.492188 26.636719 33.433594 26.207031 33.304688 25.757813 C 33.175781 25.308594 32.960938 24.890625 32.65625 24.503906 C 32.355469 24.121094 31.953125 23.804688 31.460938 23.550781 C 30.96875 23.300781 30.351563 23.171875 29.621094 23.171875 Z M 19.425781 23.425781 C 19.355469 23.808594 19.210938 24.132813 18.984375 24.398438 C 18.761719 24.664063 18.492188 24.878906 18.175781 25.046875 C 17.863281 25.214844 17.507813 25.335938 17.117188 25.40625 C 16.726563 25.476563 16.324219 25.515625 15.910156 25.515625 L 15.910156 27.136719 L 18.875 27.136719 L 18.875 36.027344 L 21.027344 36.027344 L 21.027344 23.425781 Z"></path></svg>
                  </div>  
                  <h5>Mijn calender</h5>
              </Link>
            
              <Link to="/dashboard" className="dashboard-main__item">
                <div className='dashboard-main__item__delete'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M 24 4 C 20.491685 4 17.570396 6.6214322 17.080078 10 L 10.238281 10 A 1.50015 1.50015 0 0 0 9.9804688 9.9785156 A 1.50015 1.50015 0 0 0 9.7578125 10 L 6.5 10 A 1.50015 1.50015 0 1 0 6.5 13 L 8.6386719 13 L 11.15625 39.029297 C 11.427329 41.835926 13.811782 44 16.630859 44 L 31.367188 44 C 34.186411 44 36.570826 41.836168 36.841797 39.029297 L 39.361328 13 L 41.5 13 A 1.50015 1.50015 0 1 0 41.5 10 L 38.244141 10 A 1.50015 1.50015 0 0 0 37.763672 10 L 30.919922 10 C 30.429604 6.6214322 27.508315 4 24 4 z M 24 7 C 25.879156 7 27.420767 8.2681608 27.861328 10 L 20.138672 10 C 20.579233 8.2681608 22.120844 7 24 7 z M 11.650391 13 L 36.347656 13 L 33.855469 38.740234 C 33.730439 40.035363 32.667963 41 31.367188 41 L 16.630859 41 C 15.331937 41 14.267499 40.033606 14.142578 38.740234 L 11.650391 13 z M 20.476562 17.978516 A 1.50015 1.50015 0 0 0 19 19.5 L 19 34.5 A 1.50015 1.50015 0 1 0 22 34.5 L 22 19.5 A 1.50015 1.50015 0 0 0 20.476562 17.978516 z M 27.476562 17.978516 A 1.50015 1.50015 0 0 0 26 19.5 L 26 34.5 A 1.50015 1.50015 0 1 0 29 34.5 L 29 19.5 A 1.50015 1.50015 0 0 0 27.476562 17.978516 z"></path></svg>
                  </div>
                  <h5>Verwijder agenda item</h5>
              </Link>
            
              <Link to="/dashboard" className="dashboard-main__item">
                <div className='dashboard-main__item__dashboard'>
                  <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50"><path d="M 25 2 C 12.354545 2 2 12.354545 2 25 C 2 37.645455 12.354545 48 25 48 C 37.645455 48 48 37.645455 48 25 C 48 12.354545 37.645455 2 25 2 z M 25 4 C 36.554545 4 46 13.445455 46 25 C 46 36.554545 36.554545 46 25 46 C 13.445455 46 4 36.554545 4 25 C 4 13.445455 13.445455 4 25 4 z M 24.984375 5.8789062 A 1.0001 1.0001 0 0 0 24 6.8945312 L 24 8.953125 A 1.0001 1.0001 0 1 0 26 8.953125 L 26 6.8945312 A 1.0001 1.0001 0 0 0 24.984375 5.8789062 z M 15.892578 8.3007812 A 1.0001 1.0001 0 0 0 15.097656 9.8261719 L 16.171875 11.617188 A 1.0001 1.0001 0 1 0 17.886719 10.587891 L 16.8125 8.796875 A 1.0001 1.0001 0 0 0 15.892578 8.3007812 z M 34.078125 8.3007812 A 1.0001 1.0001 0 0 0 33.1875 8.796875 L 32.113281 10.587891 A 1.0001 1.0001 0 1 0 33.828125 11.617188 L 34.902344 9.8261719 A 1.0001 1.0001 0 0 0 34.078125 8.3007812 z M 9.359375 14.84375 A 1.0001 1.0001 0 0 0 8.9042969 16.707031 L 10.695312 17.78125 A 1.0001 1.0001 0 1 0 11.722656 16.066406 L 9.9316406 14.992188 A 1.0001 1.0001 0 0 0 9.359375 14.84375 z M 40.027344 15 A 1.0001 1.0001 0 0 0 39.640625 15.066406 L 23.652344 21.228516 A 1.0001 1.0001 0 0 0 23.185547 21.599609 C 21.931912 22.266866 21 23.474558 21 25 C 21 27.209804 22.790196 29 25 29 C 25.690891 29 26.258107 28.68094 26.820312 28.380859 A 1.0001 1.0001 0 0 0 27.509766 28.140625 L 40.654297 16.755859 A 1.0001 1.0001 0 0 0 40.027344 15 z M 35.017578 18.992188 L 26.318359 26.527344 A 1.0001 1.0001 0 0 0 26.238281 26.582031 C 25.898116 26.844731 25.49009 27 25 27 C 23.809804 27 23 26.190196 23 25 C 23 24.057093 23.530471 23.384107 24.330078 23.119141 A 1.0001 1.0001 0 0 0 24.482422 23.052734 L 35.017578 18.992188 z M 7 23.894531 A 1.0001 1.0001 0 1 0 7 25.894531 L 9.0605469 25.894531 A 1.0001 1.0001 0 1 0 9.0605469 23.894531 L 7 23.894531 z M 40.939453 23.894531 A 1.0001 1.0001 0 1 0 40.939453 25.894531 L 43 25.894531 A 1.0001 1.0001 0 1 0 43 23.894531 L 40.939453 23.894531 z M 11.236328 31.857422 A 1.0001 1.0001 0 0 0 10.695312 32.005859 L 8.9042969 33.082031 A 1.0001 1.0001 0 1 0 9.9335938 34.796875 L 11.724609 33.720703 A 1.0001 1.0001 0 0 0 11.236328 31.857422 z M 38.734375 31.857422 A 1.0001 1.0001 0 0 0 38.275391 33.720703 L 40.066406 34.796875 A 1.0001 1.0001 0 1 0 41.095703 33.082031 L 39.304688 32.005859 A 1.0001 1.0001 0 0 0 38.734375 31.857422 z"></path></svg>
                </div>
                <h5> Dashboard</h5>
              </Link>
            
            <div class="dashboard-main__item">
              <div className='dashboard-main__item__pillcase'>
                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50"><path d="M 11.6875 2 C 10.433594 2 9.46875 2.863281 9.03125 4 L 9 4 C 7.355469 4 6 5.355469 6 7 L 6 12 L 8 12 L 8 18.6875 C 7.941406 18.882813 7.941406 19.085938 8 19.28125 L 8 38.6875 C 7.941406 38.882813 7.941406 39.085938 8 39.28125 L 8 45 C 8 46.644531 9.355469 48 11 48 L 39 48 C 40.644531 48 42 46.644531 42 45 L 42 39.1875 C 42.027344 39.054688 42.027344 38.914063 42 38.78125 L 42 19.1875 C 42.027344 19.054688 42.027344 18.914063 42 18.78125 L 42 12 L 44 12 L 44 7 C 44 5.355469 42.644531 4 41 4 L 40.96875 4 C 40.53125 2.863281 39.566406 2 38.3125 2 Z M 11.6875 4 L 38.3125 4 C 38.808594 4 39.199219 4.355469 39.28125 4.84375 L 39.34375 5.15625 L 39.5 6 L 41 6 C 41.566406 6 42 6.433594 42 7 L 42 10 L 8 10 L 8 7 C 8 6.433594 8.433594 6 9 6 L 10.53125 6 L 10.65625 5.15625 L 10.71875 4.84375 C 10.800781 4.355469 11.191406 4 11.6875 4 Z M 10 12 L 40 12 L 40 18 L 10 18 Z M 10 20 L 40 20 L 40 38 L 10 38 Z M 19 22 L 19 31 L 21 31 L 21 28 L 22.65625 28 L 25.59375 32.375 L 23 36 L 25 36 L 26.5625 33.84375 L 28 36 L 30 36 L 27.59375 32.375 L 30 29 L 28 29 L 26.625 30.9375 L 24.40625 27.625 C 25.347656 27.117188 26 26.136719 26 25 C 26 23.355469 24.644531 22 23 22 Z M 21 24 L 23 24 C 23.566406 24 24 24.433594 24 25 C 24 25.566406 23.566406 26 23 26 L 21 26 Z M 10 40 L 40 40 L 40 45 C 40 45.566406 39.566406 46 39 46 L 11 46 C 10.433594 46 10 45.566406 10 45 Z"></path></svg>
              </div>
              
              <h5> Smart pillendoos</h5>
    
              </div>
              
            </div>
          </div>
          
        </div>
      </div>
    

    );
}

export default Settings
