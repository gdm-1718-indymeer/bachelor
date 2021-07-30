import React from 'react'

const Settings = () => {
    return (
        

        <div class="wrapper">
        <div class="dashboard">
          
          <div class="dashboard__header">
            <p>HOME MONITORING</p>
            <p>December 11, 2015</p>
          </div>
          
          <div class="dashboard__main">
            <div class="row">
              
              <div class="dashboard-main__item">
                <h5><i class="fas fa-bolt"></i> ELECTRICITY</h5>
                <h4>78</h4>
                <h6>Kw/h</h6>
                <img src="https://api-lunacy.icons8.com/api/assets/2138066c-6fcb-490e-9945-a0ef199677f8/graph.png" alt="" class="dashboard-main-item__graph" />
              </div>
              
              <div class="dashboard-main__item">
                <h5><i class="fas fa-tint"></i> WATER</h5>
                <h4>12</h4>
                <h6>m<sup>3</sup>/h</h6>
                <img src="https://api-lunacy.icons8.com/api/assets/3d0f53f1-6ebf-4183-a1b3-867abb715bf1/graph.png" alt="" class="dashboard-main-item__graph" />
              </div>
            
            <div class="dashboard-main__item">
                <h5><i class="fas fa-trash-alt"></i> TRASH</h5>
                <h4>0.5</h4>
                <h6>Kg/h</h6>
                <img src="https://api-lunacy.icons8.com/api/assets/375b8b4f-bf78-45a5-84da-dd68a7a9db77/graph.png" alt="" class="dashboard-main-item__graph" />
              </div>
            
            <div class="dashboard-main__item">
                <h5><i class="fas fa-thermometer-half"></i> TEMPARATURE</h5>
              <h4>20<sup>o</sup></h4>
                <h6>Celsius</h6>
                <img src="https://api-lunacy.icons8.com/api/assets/6cf998bc-8dfe-4e48-889b-263c9115d457/graph.png" alt="" class="dashboard-main-item__graph" />
              </div>
            
            <div class="dashboard-main__item">
                <h5><i class="fas fa-cloud-showers-heavy"></i> HUMIDITY</h5>
              <h4>48</h4>
                <h6>Percent</h6>
                <img src="https://api-lunacy.icons8.com/api/assets/3bbd12bd-06c4-4c43-9b3d-06c1bfb7300c/graph.png" alt="" class="dashboard-main-item__graph" />
              </div>
            
            <div class="dashboard-main__item">
                <h5><i class="fas fa-wifi"></i> BANDWIDTH USAGE</h5>
              <h4>10</h4>
                <h6>Mb/h</h6>
                <img src="https://api-lunacy.icons8.com/api/assets/909016cb-0ac4-4a6f-833b-9271012c7a10/graph.png" alt="" class="dashboard-main-item__graph" />
              </div>
              
            </div>
          </div>
          
        </div>
      </div>
    

    );
}

export default Settings
