class Drawer {
  #origin = null;
  weight = 1/2;
  constructor (originX = 0, originY = 0) {
    this.#origin = {
      x: originX,
      y: originY
    }
  }
  testCoor(x, y) {
    let isNumber = n => typeof n == 'number' && !isNaN(n);
    if (!isNumber(x))
      throw new Error(`the data "${x}" is not valid number`);
    
    else if (!isNumber(y))
      throw new Error(`the data "${y}" is not valid number`);
  }
  clear() {
    this.context.clearRect(0, 0, canvas.width, canvas.height);
    return this;
  }
  move(x, y) {
    try {
      this.testCoor(x, y);
      this.#origin = { x, y };
    } catch (exception) {
      console.warn(exception.message);
    }
    return this;
  }
  line(x, y) {
    try {
      this.testCoor(x,y);
      // 4 5, 4 7
      let differenceX = x - this.#origin.x,
      factx = differenceX < 0? -1 : 1,
      differenceY = y - this.#origin.y,
      facty = differenceY < 0? -1 : 1;
      // on function X
      if (Math.abs(differenceX) >= Math.abs(differenceY)) {
        for (let coorX = 0; coorX <= Math.abs(differenceX); coorX+=1/100) {
          this.context.fillRect(coorX*factx + this.#origin.x, this.#origin.y + coorX*differenceY/Math.abs(differenceX), this.weight, this.weight);
        }
      }
      // on function Y
      else {
        for (let coorY = 0; coorY <= Math.abs(differenceY); coorY += 1 / 100) {
          this.context.fillRect(this.#origin.x + coorY* differenceX / Math.abs(differenceY), coorY * facty + this.#origin.y, this.weight, this.weight);
        }
      }
    }
    catch (exception) {
      console.warn(exception.message);
    }
    return this;
  }
  circle(x, y, r) {
    try {
      this.testCoor(x, y);
      this.testCoor(y, r);
      if (r < 0) throw new Error(`The radius is not positive`);
      const arcs = (fact) => {
        for (let coor = r; coor >= 0; coor -= 1 / 100) {
          this.context.fillRect(x + coor, y + fact * Math.sqrt(r ** 2 - coor ** 2), this.weight, this.weight);
        }
        for (let coor = r; coor >= 0; coor -= 1 / 100) {
          this.context.fillRect(x - coor, y + fact * Math.sqrt(r ** 2 - coor ** 2), this.weight, this.weight);
        }
      }
      
      arcs(1);
      arcs(-1);
    } catch (exception) {
      console.warn(exception.message);
    }
    return this;
  }
}