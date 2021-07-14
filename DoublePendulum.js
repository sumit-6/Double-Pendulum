let PI = 3.1415926535;
let dx = 0.0001;

let black_r1 = 200.0;
let black_r2 = 200.0;
let black_m1 = 30.0;
let black_m2 = 30.0;
let black_a1 = PI/2;
let black_a2 = PI/8;
let black_a1_v = 0.0;
let black_a2_v = 0.0;

let red_r1 = 200.0;
let red_r2 = 200.0;
let red_m1 = 30.0;
let red_m2 = 30.0;
let red_a1 = PI/2 + 1*dx;
let red_a2 = PI/8;
let red_a1_v = 0.0;
let red_a2_v = 0.0;

let green_r1 = 200.0;
let green_r2 = 200.0;
let green_m1 = 30.0;
let green_m2 = 30.0;
let green_a1 = PI/2 + 2*dx;
let green_a2 = PI/8;
let green_a1_v = 0.0;
let green_a2_v = 0.0;

let g = 1;
let points1 = [];
let points2 = [];
let points3 = [];

let result1 = [];
let result2 = [];
let result3 = [];

function setup()
{
    createCanvas(1500, 700);
}

function Pendulum(r1,r2,m1,m2,a1,a2,a1_v,a2_v,points,color)
{
    let num1 = -g*((2*m1) + m2)*sin(a1);
    let num2 = -m2*g*sin(a1- (2*a2));
    let num3 = -2*sin(a1 - a2)*m2*((a2_v*a2_v*r2) + (a1_v*a1_v*r1*cos(a1-a2)));
    let den = r1*((2*m1) + m2 - (m2*cos(2*a1 - 2*a2)));
    if(den == 0)
    {
        den = 0.0000001;
    }
    let a1_a = (num1 + num2 + num3)/den;

    num1 = 2*sin(a1-a2);
    num2 = a1_v*a1_v*r1*(m1+m2) + g*(m1 + m2)*cos(a1) + a2_v*a2_v*r2*m2*cos(a1-a2);
    den = r2*(2*m1 + m2 - m2*cos(2*a1 - 2*a2));
    if(den == 0)
    {
        den = 0.0000001;
    }
    let a2_a = (num1*num2)/den;
    
    stroke(color);
    strokeWeight(3);
    
    
    let x1 = r1*sin(a1);
    let y1 = r1*cos(a1);

    let x2 = x1 + r2*sin(a2);
    let y2 = y1 + r2*cos(a2);
    
    
    points.unshift(createVector(x2,y2));
    line(0,0,x1,y1);
    fill(color);
    ellipse(x1,y1,m1,m1);
    
    line(x1,y1,x2,y2);
    fill(color);
    ellipse(x2,y2,m2,m2);
    stroke(color);
    strokeWeight(1);
    beginShape();
    noFill();
    for (let i = 0; i< points.length ; i++)
    {
        vertex(points[i].x,points[i].y);
    }
    endShape();

    if(points.length >= 180)
    {
        points.pop();
    }
    
    a1_v += a1_a;
    a2_v += a2_a;

    a1 += a1_v;
    a2 += a2_v;
    return [a1,a2,a1_v,a2_v,points];
}

function draw()
{
    background(255);
    
    translate(750, 150);
    let color3 = 'red';
    result3 = Pendulum(red_r1,red_r2,red_m1,red_m2,red_a1,red_a2,red_a1_v,red_a2_v,points3,color3);
    red_a1 = result3[0];
    red_a2 = result3[1];
    red_a1_v = result3[2];
    red_a2_v = result3[3];
    points3 = result3[4];

    
    let color2 = 'green';
    result2 = Pendulum(green_r1,green_r2,green_m1,green_m2,green_a1,green_a2,green_a1_v,green_a2_v,points2,color2);
    green_a1 = result2[0];
    green_a2 = result2[1];
    green_a1_v = result2[2];
    green_a2_v = result2[3];
    points2 = result2[4];
    

    let color1 = 'black';
    result1 = Pendulum(black_r1,black_r2,black_m1,black_m2,black_a1,black_a2,black_a1_v,black_a2_v,points1,color1);
    black_a1 = result1[0];
    black_a2 = result1[1];
    black_a1_v = result1[2];
    black_a2_v = result1[3];
    points1 = result1[4];
}