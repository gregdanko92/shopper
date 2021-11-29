import React from 'react';
import { Link } from 'react-router-dom';
import ShopWetsuits from './../../assets/wetsuits.jpeg';
import ShopSurfboards from './../../assets/surfboards.png';
import './styles.scss';

const Directory = props => {
  return (
    <div className="directory">
      <div className="wrap">
        <div
          className="item"
          style={{
            backgroundImage: `url(${ShopSurfboards})`
          }}
        >
          <Link to="/search/surfboards">
            Shop Surfboards
          </Link>
        </div>
        <div
          className="item"
          style={{
            backgroundImage: `url(${ShopWetsuits})`
          }}
        >
          <Link to="/search/wetsuits">
            Shop Wetsuits
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Directory;