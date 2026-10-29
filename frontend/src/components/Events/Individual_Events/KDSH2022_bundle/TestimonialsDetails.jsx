import React from 'react';

const TestiMonialsDetails = ({testiMonialDetail}) => {
    const {name, description, img} = testiMonialDetail;
    console.log("testiMonialDetail"+testiMonialDetail)
    return (
        <div class="item">
            <div class="bg-[rgba(255,255,255,0.1)] p-[20px]! rounded-[4px] text-center shadow-[0_19px_38px_rgba(0,0,0,0.1),0_15px_12px_rgba(0,0,0,0.02)] border-b border-l border-[rgba(255,255,255,0.1)] backdrop-blur-[5px] flex flex-col items-center">
                <img class="max-h-[200px]! max-w-[200px]! rounded-full" src={img} />
                <br />
                <p className="leading-[40px] text-[25px] text-[rgba(255,255,255,0.7)]! max-[480px]:text-[20px]"
                style={{fontFamily: 'Georgia, "Times New Roman", Times, serif'}}>{description}</p>
                <br /><br />
                <p className="text-right pr-[4rem]! text-[19px] font-bold text-white! "
                style={{fontFamily : 'Georgia, "Times New Roman", Times, serif'}}>~ {name}</p>
            </div>
        </div>
    );
};

export default TestiMonialsDetails;