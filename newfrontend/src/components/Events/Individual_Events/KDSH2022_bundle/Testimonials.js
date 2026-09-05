import React, { useEffect, useState } from 'react';
import TestiMonialsDetails from './TestiMonialsDetails'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import userPic from '../../../../assets/pics/naruto.jpg';
import kshitiz from '../../../../assets/pics/events/kshtitiz.jpg'
import ritik from '../../../../assets/pics/events/ritik agarwal.jpeg'
import './KDSH2022.css'

const TestiMonials = () => {
  
    const testiMonials = [
        {
            name: 'Kshitiz Kumawat, Member of Winning team of KDSH 2021',
            description: 'Kharagpur Data Science Hackathon 2021 gave me the chance to apply my learnings in an innovative and practical way.  Through this hackathon I exchanged knowledge, tested my limits and made new friends. Thank you KDAG for this amazing opportunity. It was something more than a competition!!',
            img: kshitiz
        },
        {
            name: 'Ritik Agarwal, Member of Winning team of KDSH 2020',
            description: 'All the rounds in the hackathon were very challenging. They were made quite similar to scenarios that we might face in real life industry problems. The competition was quite fierce, and all the teams gave it their best. We totally enjoyed participating in it and most importantly learnt a lot from it. Thank you KDAG for organizing this wonderful event.',
            img: ritik
        },
    ]
    //Owl Carousel Settings
    const options = {
        loop: true,
        center: true,
        items: 2,
        margin: 20,
        autoplay: true,
        dots: true,
        autoplayTimeout: 10000,
        smartSpeed: 450,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    };
    return (
        <section id="testimonial" className="testimonials pt-70 pb-70">
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <OwlCarousel className="owl-carousel owl-theme" {...options}>
                            {
                                testiMonials.length === 0 ?
                                    <div class="item">
                                        <div class="shadow-effect">
                                            <img class="img-circle" src={userPic} />

                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</p>
                                        </div>
                                        <div class="testimonial-name">
                                            <h5>Ayush Aryan</h5>
                                            <small>India</small>
                                        </div>
                                    </div> :
                                    testiMonials.map(testiMonialDetail => {
                                        return (
                                            <TestiMonialsDetails testiMonialDetail={testiMonialDetail} key={testiMonialDetail._key} />

                                        )
                                    })
                            }
                        </OwlCarousel>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestiMonials;