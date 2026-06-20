import React from 'react'
import Fade from "../Common/Motion/Fade.js";

const TeamCardAlumni2 = ({ member }) => {
  return (
    <>
        <div className='w-1/2 max-w-60' 
        style={{ marginRight:'50px', margin: '1.5rem', marginRight:'35px' }}>
			<Fade bottom>
				<div className="group flex flex-col items-center w-full rounded-t-[5px] font-medium [transition:all_0.7s, box-shadow_1s, top_1s, left_1s] hover:bottom-0"
                style={{ padding: '2rem' }}>
					<div class="relative m-auto w-40 h-40 overflow-hidden rounded-full top-0 left-0 transition-all duration-800"
                    style={{ marginTop : '1rem' }}>
						<img src={member?.image} alt="John" className='w-full' />
					</div>
					<div class="text-[1.5rem] text-center text-white h-16.25 relative bottom-0 transition-all duration-500 leading-6.25 group-hover:bottom-0"
                    style={{ fontFamily : "'Satisfy', cursive"}}>
						<p>{member?.name || "Name of Member"}</p>
					</div>

					<div class="opacity-0 absolute text-center group-hover:opacity-100 group-hover:bottom-7.5">
						<p>{member?.workplace || ""}</p>
					</div>

					<div class="text-[#777] flex justify-between relative -bottom-2.5 transition-all duration:300 opacity-0 group-hover:opacity-100 group-hover:scale-120">
						<div style={{paddingLeft : '15px'}}>
							<span>Follow on</span>
						</div>
						<div class="flex"
                        style={{paddingRight : '15px'}}>
							<div className='hover:text-[#fb8787]'
                            style={{paddingLeft : '0.8rem'}}>
								{member?.facebook && (
									<a
										href={member.facebook}
										target="_blank"
										rel="noreferrer noopener"
                                        className='no-underline text-inherit'
									>
										<i className="fab fa-facebook"></i>
									</a>
								)}

							</div>

							<div className='hover:text-[#fb8787]'
                            style={{paddingLeft : '0.8rem'}}>
								<a
									href={member?.linkedin || "#"}
									target="_blank"
									rel="noreferrer noopener"
                                    className='no-underline text-inherit'
								>
									<i class="fab fa-linkedin"></i>
								</a>
							</div>
						</div>
					</div>
				</div>
			</Fade>
		</div>
    </>
  )
}

export default TeamCardAlumni2
