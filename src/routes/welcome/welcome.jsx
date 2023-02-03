import { useState } from "react";
import laboratory1 from '../../asstes/laboratory1.jpg'
import laboratory2 from '../../asstes/laboratory2.jpg'
import laboratory3 from '../../asstes/laboratory3.jpg'
import laboratory4 from '../../asstes/laboratory4.jpg'
const Welcome = () => {
const [openInfomational,setOpenInformational] = useState(false)
return (
  <div className="welcome-page">
    <header>
   <h1>Laboratory Website</h1>
    </header>
    <div className={`informational-container ${(openInfomational)?'open':''}`} >
      <h3>Did You Know ?</h3>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. At mollitia pariatur fugiat error perspiciatis soluta rerum aliquam totam vero accusamus veritatis animi nesciunt ea corporis id ullam esse, culpa ipsam!
        Repellat vel dolor beatae harum voluptate nostrum architecto sequi id obcaecati at, sapiente voluptatum adipisci molestias corrupti earum? Dolorem ut quidem veniam. Ipsum distinctio tenetur, eligendi reiciendis ab repudiandae qui!
        Officiis, dolor ex expedita maxime eligendi voluptatibus, fugit dolores voluptatem ratione, accusantium enim dolorum nisi perspiciatis unde similique eaque libero nesciunt quis quibusdam dignissimos inventore minima! Modi repellat sint officia!
      </p>
      <div className="read-more" onClick={()=>{setOpenInformational(prev =>!prev)}}>
      {openInfomational?
        <span>read less</span>
        :
        <span>read more</span>
      }
      </div>
    </div>
    <div className="main-messages-container">
    <div className='inner-main-messages-container'>
      <h3>NOTE BOARD </h3>
      <div className='main-messages-text-box'>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis ratione explicabo tempora eius consequatur ea itaque iusto, nostrum excepturi iste, perspiciatis recusandae ipsum accusamus dignissimos laborum? Perferendis libero minus dicta.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis ratione explicabo tempora eius consequatur ea itaque iusto, nostrum excepturi iste, perspiciatis recusandae ipsum accusamus dignissimos laborum? Perferendis libero minus dicta.</p>
      </div>
   
    </div>
    </div>
    <div className="general-masseges-container">
      <ul>
        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate perferendis voluptatum autem, deserunt ex excepturi iusto 
        </li>
        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate perferendis voluptatum autem, deserunt ex excepturi iusto 
        </li>
        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate perferendis voluptatum autem, deserunt ex excepturi iusto 
        </li>
      </ul>
    </div>
    <div className="image-gallery">
    <div className="gallery-container">
    <div className="image-gallery-bc"></div>
    <img src={laboratory1} alt="laboratory" />
    <img src={laboratory2} alt="laboratory" />
    <img src={laboratory3} alt="laboratory" />
    <img src={laboratory4} alt="laboratory" />
    </div>

    </div>
  </div>
);
};

export default Welcome;