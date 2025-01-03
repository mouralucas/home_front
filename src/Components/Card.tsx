import React from 'react';
import '../Assets/Core/Components/Cards.css'

interface CardProps {
    children: any,
    marginTop?: string,
}

const Card = ({children, marginTop = 'mt-4'}: CardProps) => {
    let subComponentList = Object.keys(Card);

    let subComponents = subComponentList.map((key) => {
        return React.Children.map(children, (child) =>
            child.type.displayName === key ? child : null
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

const Header = (props: any) => <div className='card-header'>{props.children}</div>;
Header.displayName = 'Header';
Card.Header = Header;

const Body = (props: any) => <div className='card-body'>{props.children}</div>;
Body.displayName = 'Body';
Card.Body = Body;

const Footer = (props: any) => <div className='card-footer'>{props.children}</div>;
Footer.displayName = 'Footer';
Card.Footer = Footer;

export default Card;