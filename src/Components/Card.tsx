import React from 'react';
import '../Assets/Core/Components/Cards.css'
import {any} from "prop-types";

interface CardProps {
    children: any,
    marginTop?: string,
}

const Card = ({children, marginTop = 'mt-4'}: CardProps) => {
    let subComponentList = Object.keys(Card);

    let subComponents = subComponentList.map((key) => {
        return React.Children.map(children, (child) =>
            child.type.name === key ? child : null
        );
    });

    return (
        <div className={marginTop}>
            <div className='card-default'>
                {subComponents.map((component) => component)}
            </div>
        </div>
    );
};

const Header = (props) => <div className='card-header justify-content-between d-flex flex-wrap'>{props.children}</div>;
Card.Header = Header;

const Body = (props) => <div className='card-body'>{props.children}</div>;
Card.Body = Body;

const Footer = (props) => <div className='card-footer'>{props.children}</div>;
Card.Footer = Footer;

export default Card;