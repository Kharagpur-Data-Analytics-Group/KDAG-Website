import React from "react";
import "./EventsCard.css";
import Fade from "../../Common/Motion/Fade.js"
import { Link } from "react-router-dom";

const EventsCard = ({ event }) => {
  return (
      <div>
          <Fade bottom>
              <div className="events-card" >
                  <div
                      className="events-card-left"
                      style={{ backgroundImage: `url(${event.image})` }}
                  >
                      {/* <img src={event.image} alt="event-poster" /> */}
                  </div>
                  <div className="events-card-right">
                      <div className="events-card-title">
                          {event.title || "Event Title"}
                      </div>
                      <div className="events-card-location">
                          <i class="fas fa-map-marker-alt"></i>{" "}
                          {event.location || "location, platform"}
                      </div>
                      {event.date && (
                          <div className="events-card-date">
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
                      
                      <div className="events-card-button-outerMost">
                            {event.resources && <a
                                href={event.resources || "#"}
                                target="_blank"
                                rel="noreferrer noopener">
                                <div className="events-card-button">
                                    <div className="events-card-button2">
                                        {event.infotext
                                            ? event.infotext
                                            : "View Resources"}
                                    </div>
                                    <div className="events-card-button1">
                                        <i class="fa fa-link"></i>
                                    </div>
                                </div>
                            </a>}
                      </div>

                      <div className="events-card-button-outerMost">
                            {event.link && <a
                                href={event.link || "#"}
                                target="_blank"
                                rel="noreferrer noopener">
                                <div className="events-card-button">
                                    <div className="events-card-button2">
                                        {event.infotext
                                            ? event.infotext
                                            : "Event Information"}
                                    </div>
                                    <div className="events-card-button1">
                                        <i class="fa fa-link"></i>
                                    </div>
                                </div>
                            </a>}
                      </div>
                      {event.certificates ? (
                        
                      <div className="events-card-button-outerMost">
                          <Link to={event.certificates}>
                              <div className="events-card-button">
                                  <div className="events-card-button2">
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
