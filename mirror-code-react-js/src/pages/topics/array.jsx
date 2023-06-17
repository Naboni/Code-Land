import React from 'react';

import { Prism } from '@mantine/prism';

import { js, python, cpp } from '../../constants/topics/array';

import SimpleNav from '../../components/simple-nav';
import CenterContent from '../../components/center-content';

export default function Array() {
  return (
    <>
      <SimpleNav />
      <CenterContent>
        <div>
          <h1>Arrays</h1>
          <p>
            An array is a collection of items stored at contiguous memory locations. The idea is to store multiple items of the same type together.
            This makes it easier to calculate the position of each element by simply adding an offset to a base value, i.e., the memory location of
            the first element of the array (generally denoted by the name of the array).
          </p>
          <br />
          <img src={'/assets/array_1.PNG'} width="100%" alt="logo" />
          <br />
          <h2>What are Data Structures?</h2>
        <p>Data structure is a storage that is used to store and organize data. It is a way of arranging data on a computer so that it can be accessed and updated efficiently.

Depending on your requirement and project, it is important to choose the right data structure for your project. For example, if you want to store data sequentially in the memory, then you can go for the Array data structure.
<br/>
<img src={'/assets/array.PNG'} width="70%" style={{margin : "0 auto",display : "block"}} alt="logo" />



</p>
        <br />
          <br />
          <br />

          <Prism.Tabs defaultValue="javascript">
            <Prism.TabsList>
              <Prism.Tab value="javascript">javascript</Prism.Tab>
              <Prism.Tab value="python">python</Prism.Tab>
              <Prism.Tab value="cpp">cpp</Prism.Tab>
            </Prism.TabsList>

            <Prism.Panel language="js" value="javascript">
              {js}
            </Prism.Panel>
            <Prism.Panel language="python" value="python">
              {python}
            </Prism.Panel>
            <Prism.Panel language="cpp" value="cpp">
              {cpp}
            </Prism.Panel>
          </Prism.Tabs>
        </div>
      </CenterContent>
    </>
  );
}
