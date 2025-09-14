import React, { useEffect, useState } from 'react';
import dealsImg from '../../assets/deals.png';

const DealsSection = () => {
    const targetDate = new Date('2025-10-15T23:59:59').getTime();


    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference <= 0) {
                clearInterval(interval);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / (1000 * 60)) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    return (
        <section className="section__container deals__container">
            <div className="deals__image">
                <img src={dealsImg} alt="deal1" />
            </div>
            <div className="deals__content">
                <h5>Get Up To 20% Discount</h5>
                <h4>Deals of This Month</h4>
                <p>
                    Our Women's Fashion Deals of the Month are here to make your style
                    dreams a reality without breaking the bank. Discover a curated
                    collection of exquisite clothing, accessories, and footwear, all
                    handpicked to elevate your wardrobe.
                </p>
                <div className="deals__countdown flex-wrap">
                    <div className="deals__countdown__card">
                        <h4>{timeLeft.days}</h4>
                        <p>Days</p>
                    </div>
                    <div className="deals__countdown__card">
                        <h4>{timeLeft.hours}</h4>
                        <p>Hours</p>
                    </div>
                    <div className="deals__countdown__card">
                        <h4>{timeLeft.minutes}</h4>
                        <p>Mins</p>
                    </div>
                    <div className="deals__countdown__card">
                        <h4>{timeLeft.seconds}</h4>
                        <p>Secs</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DealsSection;
