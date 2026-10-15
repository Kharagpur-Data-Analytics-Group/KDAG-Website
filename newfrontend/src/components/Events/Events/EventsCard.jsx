import React from "react";
import Fade from "../../Common/Motion/Fade.jsx"
import { Link } from "react-router-dom";

const EventsCard = ({ event }) => {
  return (
      <div>
          <Fade bottom>
              <div 
                className="flex w-[90%] !my-[3rem] !mx-auto rounded-[15px] bg-[rgba(255,255,255,0.042)] border-t border-l border-[rgba(255,255,255,0.1)] backdrop-blur-[5px] transition-all duration-400 hover:bg-[rgba(104,58,58,0.15)] hover:shadow-[0_0_25px_rgba(250,57,70,1)] hover:-translate-y-[5px] max-[900px]:block max-[900px]:max-w-[30rem] items-center" >
                    <div className="w-[40%] relative max-[900px]:w-full">
                        <img
                            src={event.image}
                            alt=""
                            className="w-[60%] h-auto block"
                        />
                        </div>

                  {/* <div
                      className="w-[40%] bg-cover bg-top relative max-[900px]:w-full max-[900px]:h-[20rem]"
                      style={{ backgroundImage: `url(${event.image})` }}
                  >
                      <img src={event.image} alt="event-poster" />
                  </div> */}
                  <div className="w-[60%] text-center !p-[1.5rem] max-[900px]:w-full">

                      <div className="text-[1.5rem] font-bold !m-[1rem] !text-white transition-all duration-400">
                          {event.title || "Event Title"}
                      </div>
                      <div className="!mt-[1rem] !text-[#777]">
                          <i class="fas fa-map-marker-alt"></i>{" "}
                          {event.location || "location, platform"}
                      </div>
                      {event.date && (
                          <div className="!mt-[0.5rem] !text-[#777]">
                              <i class="far fa-calendar-alt"></i> {event.date}
                          </div>
                      )}
                      {/* {event.link==="Coming Soon" ? 
                    <div className="events-card-button"><div className="events-card-button2">Coming Soon</div></div> :  */}
                      {/* {event.resources ? (
                        
                      <div className="events-card-button-outerMost">
                          <Link to={event.resources}>
                              <div className="events-card-button">
                                  <div className="events-card-button2">
                                      View Resources
                                  </div>
                                  <div className="events-card-button1">
                  <i class="fa fa-link"></i>
                </div>
                              </div>
                          </Link> 
                      </div>
                      ) : (
                          <div />
                      )} */}
                      
                      <div className="!m-auto flex justify-center">
                            {event.resources && <a
                                href={event.resources || "#"}
                                target="_blank"
                                className="no-underline"
                                rel="noreferrer noopener">

                                <div className="w-full mx-auto bg-[linear-gradient(90deg,#9a2323b9,#a14a55,#9a2323b9)]
                                bg-[length:300%_100%]  text-white flex shadow-[1px_1px_10px_1px_rgba(0,0,0,0.5)] min-w-[20rem] mt-6 border-0 rounded-[30px] transition-all duration-700 mt-4 cursor-pointer">
                                    <div className="inline-block !p-[1rem] grow-1">
                                        {event.infotext
                                            ? event.infotext
                                            : "View Resources"}
                                    </div>
                                    <div className="inline-block !p-[1rem]">
                                        <i class="fa fa-link"></i>
                                    </div>
                                </div>
                            </a>}
                      </div>

                      <div className="!m-auto flex justify-center">
                            {event.link && <a
                                href={event.link || "#"}
                                target="_blank"
                                className="no-underline"
                                rel="noreferrer noopener">
                                <div className="w-full mx-auto bg-[linear-gradient(90deg,#9a2323b9,#a14a55,#9a2323b9)]
                                bg-[length:300%_100%]  text-white flex shadow-[1px_1px_10px_1px_rgba(0,0,0,0.5)] min-w-[20rem] mt-6 border-0 rounded-[30px] transition-all duration-700 mt-4 cursor-pointer">
                                    <div className="inline-block !p-[1rem] grow-1">
                                        {event.infotext
                                            ? event.infotext
                                            : "Event Information"}
                                    </div>
                                    <div className="inline-block !p-[1rem]">
                                        <i class="fa fa-link"></i>
                                    </div>
                                </div>
                            </a>}
                      </div>
                      {event.certificates ? (
                        
                      <div className="!m-auto flex justify-center">
                          <Link to={event.certificates}>
                              <div className="w-full mx-auto bg-[linear-gradient(90deg,#9a2323b9,#a14a55,#9a2323b9)]
                                bg-[length:300%_100%]  text-white flex shadow-[1px_1px_10px_1px_rgba(0,0,0,0.5)] min-w-[20rem] mt-6 border-0 rounded-[30px] transition-all duration-700 mt-4 cursor-pointer">
                                  <div className="inline-block !p-[1rem] grow-1">
                                      Generate Certificate
                                  </div>
                                  {/* <div className="events-card-button1">
                  <i class="fa fa-link"></i>
                </div> */}
                              </div>
                          </Link>
                      </div>
                      ) : (
                          <div />
                      )}
                  </div>
              </div>
          </Fade>
      </div>
  );
};

export default EventsCard;
