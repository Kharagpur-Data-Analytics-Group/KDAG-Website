import React from 'react';

const TestiMonialsDetails = ({testiMonialDetail}) => {
    const {name, description, img} = testiMonialDetail;
    console.log("testiMonialDetail"+testiMonialDetail)
    return (
        <div class="item">
            <div class="shadow-effect">
                <img class="img-circle" src={img} />
                <br />
                <p className="testimonial_description">{description}</p>
                <br /><br />
                <p className="testimonial_name">~ {name}</p>
            </div>
        </div>
    );
};

export default TestiMonialsDetails;