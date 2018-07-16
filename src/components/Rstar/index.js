import React, { Component } from 'react';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import PropTypes from 'prop-types';
import styles from './index.less';

export default class RStar extends Component {
  static propTypes = {
    starscolor: PropTypes.number,
    starsamount: PropTypes.number,
    starsradius: PropTypes.number,
    movrange: PropTypes.number,
    speed: PropTypes.number,
    trailing: PropTypes.number,
  }

  static defaultProps = {
    starscolor: 230,
    starsamount: 800,
    starsradius: 60,
    movrange: 2,
    speed: 25000,
    trailing: 0.5,
  }
  constructor(props) {
    super(props);
    this.canvas = null;
    this.ctx = null;
    this.canvas2 = null;
    this.ctx2 = null;
    this.w = 0;
    this.h = 0;
    this.count = 0;
    this.c = 0;
    this.stars = [];
    this.handleRoot = ele => {
      this.canvas = ele;
    };

    this.state = {
    };
  }
  componentDidMount() {
    this.resize();
    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  @Bind()
  @Debounce(400)
  resize(){
    this.stars = [];

    this.ctx = this.canvas.getContext('2d');
    this.w = this.canvas.width = window.innerWidth;
    this.h = this.canvas.height = window.innerHeight;

    this.canvas2 = document.createElement('canvas');
    this.ctx2 = this.canvas2.getContext('2d');
    this.canvas2.width = 100;
    this.canvas2.height = 100;

    const half = this.canvas2.width / 2;
    const gradient2 = this.ctx2.createRadialGradient(half, half, 0, half, half, half);
    gradient2.addColorStop(0.025, '#CCC');
    gradient2.addColorStop(0.1, 'hsl(' + this.props.starscolor + ', 61%, 33%)');
    gradient2.addColorStop(0.25, 'hsl(' + this.props.starscolor + ', 64%, 6%)');
    gradient2.addColorStop(1, 'transparent');

    this.ctx2.fillStyle = gradient2;
    this.ctx2.beginPath();
    this.ctx2.arc(half, half, half, 0, Math.PI * 2);
    this.ctx2.fill();

    for(let i = 0; i < this.props.starsamount; i++) {
      new this.star();
    }
    this.animation();
  }

  random = (...values) => {
    let [min, max] = values;
    if (values.length < 2) {
      max = min;
      min = 0;
    }

    if (min > max) {
      [min, max] = [max, min];
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  maxOrbit = (x, y) => {
    const { movrange } = this.props;
    const max = Math.max(x, y);
    const diameter = Math.round(Math.sqrt(max * max + max * max));
    return diameter / movrange; // 星星移动范围，值越大范围越小
  }

  star = () => {
    const obj = {};
    console.log('star', this.c++)
    obj.orbitRadius = this.random(this.maxOrbit(this.w, this.h));
    obj.radius = this.random(this.props.starsradius, obj.orbitRadius) / 8;
    //星星半径大小
    obj.orbitX = this.w / 2;
    obj.orbitY = this.h / 2;
    obj.timePassed = this.random(0, this.props.starsamount);
    obj.speed = this.random(obj.orbitRadius) / this.props.speed;
    //星星移动速度
    obj.alpha = this.random(2, 10) / 10;
    this.stars.push(obj);
  }

  draw = (obj) => {
    const x = Math.sin(obj.timePassed) * obj.orbitRadius + obj.orbitX;
    const y = Math.cos(obj.timePassed) * obj.orbitRadius + obj.orbitY;
    const twinkle = this.random(10);

    if (twinkle === 1 && obj.alpha > 0) {
      obj.alpha -= 0.05;
    } else if (twinkle === 2 && obj.alpha < 1) {
      obj.alpha += 0.05;
    }

    this.ctx.globalAlpha = obj.alpha;
    this.ctx.drawImage(this.canvas2, x - obj.radius / 2, y - obj.radius / 2, obj.radius, obj.radius);
    obj.timePassed += obj.speed;
  }

  animation = () => {
    this.ctx.globalCompositeOperation = 'source-over';
    this.ctx.globalAlpha = this.props.trailing; //尾巴
    this.ctx.fillStyle = 'hsla(' + this.props.starscolor + ', 64%, 6%, 2)';
    this.ctx.fillRect(0, 0, this.w, this.h)

    this.ctx.globalCompositeOperation = 'lighter';
    if(this.stars.length > 0){
      this.stars.map(((obj, index) => {
        this.draw.call(this, obj);
        // this.draw(obj);
        return null;
      }));
    }
    window.requestAnimationFrame(this.animation);
  }

  render() {
    const {
      style,
    } = this.props;
    return (
      <div className={styles.wrap}>
        <canvas className={styles.canvas} style={style} ref={this.handleRoot}>
          {this.props.children}
        </canvas>
      </div>
    );
  }
}
