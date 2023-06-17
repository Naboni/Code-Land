import React from "react";

import { Prism } from "@mantine/prism";

import { js, python, cpp } from "../../constants/topics/string";

import SimpleNav from "../../components/simple-nav";
import CenterContent from "../../components/center-content";

function Stringg() {
    return (
        <>
        <SimpleNav />
        <CenterContent>
          <div>
            <h1>String</h1>
            <p>
            A string is a sequence of characters, often used to represent text. In programming, strings are a common data type and are used for a variety of tasks, such as representing names, addresses, and other types of information.
    <ol>
        <li>Operations:
            <p>
                <ul>
                    <li>Concatenation</li>
                    <li>Substring extraction</li>
                    <li>Length calculation
</li>
<li>Comparison</li>
<li>Searching for a pattern
</li>
<li>Replacing a substring</li>
<li>Sorting
</li>
                </ul>
            </p>
        </li>
        <li>Implementations:
        <p>
                <ul>
                    <li>Character arrays</li>
                    <li>String objects in object-oriented programming languages</li>
                
                </ul>
            </p>
        </li>
        <li>Algorithms:
        <p>
                <ul>
                    <li>Knuth-Morris-Pratt (KMP) algorithm for pattern matching</li>
                    <li>Rabin-Karp algorithm for pattern matching</li>
                    <li>Z algorithm for pattern matching</li>
                    <li>Manacher’s algorithm for finding the longest palindromic substring
</li>
                    <li>Suffix Array and Suffix Tree for string processing tasks</li>
                
                </ul>
            </p>
        </li>
        <li>Applications:
        <p>




                <ul>
                    <li>Text processing</li>
                    <li>URL parsing</li>
                    <li>Storing and manipulating human-readable data.</li>

                
                </ul>
            </p>
        </li>
    </ol>
    
            </p>
            <br />
            <h2>What is String?
    </h2>
            <p>
            Strings are considered a data type in general and are typically represented as arrays of bytes (or words) that store a sequence of characters. Strings are defined as an array of characters. The difference between a character array and a string is the string is terminated with a special character ‘\0’
            </p>
            <br />
            <img src={'/assets/string.PNG'} width="100%" alt="logo" />
            <h2>How String is represented in Memory?
    </h2>
            <p>
            In C, a string can be referred to either using a character pointer or as a character array. When strings are declared as character arrays, they are stored like other types of arrays in C. For example, if str[] is an auto variable then the string is stored in the stack segment, if it’s a global or static variable then stored in the data segment, etc.
            </p>
            
            <br/>
            <h2>Stack Implementations in Python, Java, C, and C++
    </h2>
    <p>The most common stack implementation is using arrays, but it can also be implemented using lists.</p>
    
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
            <br/> <br/>    <br/>
            <h1 style={{textAlign  : 'center'}}>You have successfully complited this topic!</h1>
            <br/><br/>
          </div>
        </CenterContent>
      </>
      );
    
}
export default Stringg