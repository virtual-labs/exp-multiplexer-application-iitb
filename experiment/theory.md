
<justify>

**1.1 Introduction**
<br>
Whenever there is a need to connect multiple input devices, one at a time, to a system, then a digital combinational circuit called multiplexer is useful.
1.2. Example 1: Implementation of 4: 1 Mux
The expression for the output Y in case of a 4:1 multiplexer is given as:

</br>

Y = A’.B’. D0 + A’. B. D1 + A. B’. D2 + A. B. D3

</br>

Or 

</br>

Y = A’.(B’.D0 + B.D1) + A.(B’.D2 + B.D3)

</br>

Construct the 4:1 mux as shown in figure 
Using simulator the circuit for 4:1 multiplexer can be constructed and verified.

</br>

</br><img src="./images/img1.png" width="400" height="400">

</br>

**Assignment:** Realize the equation Y = A’.B + B’.C’ + A.B.C using a 4 -to- 1 multiplexer.

</br>

**Solution:** 

</br>

There are three variables in the given equation. Let variables A & B be used as select lines and variable C as the data input D. Express Y as a function of minterms of three variables as shown:

</br>

Y = A’.B + B’.C’ + A.B.C

</br>

Y = A’.B + B’.C’(A’ + A) + A.B.C

</br>

Y = A’.B’.C’ +A’. B. 1 + A. B’. C’ + A.B.C  --- (iv)

</br>

The logic equation for 4:1 Mux is:

</br>

Y = A’.B’.D0 + A’.B.D1 + A.B’.D2 + A.B.D3---  (v) 

</br>

Comparing equations (iv) & (v), 

</br>

D0 = C’, D1 = 1, D2 = C’ and D3 = C

</br>

**Connection diagram**:

</br>

<img src="./images/connection.png" width="400" height="400">

</br>

**Function Table**:

</br>

<img src="./images/truthtable.jpg" width="400" height="400">

</br>

Using simulator the circuit can be build and verified.

</justify><script type="text/javascript" id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"> </script>