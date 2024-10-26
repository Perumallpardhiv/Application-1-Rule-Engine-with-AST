# Zeotap Application 1 - Rule Engine with AST

The **Rule Engine with AST** (Abstract Syntax Tree) is a flexible and intuitive system built to create, combine, update, and evaluate rules for dynamic decision-making. It offers a structured approach to defining rules, allowing users to visualize and combine them with logical operators for complex conditions.

## Features
**1. Create Rule**: Define new rules with a name and logic, and visualize them as a syntax tree.
  
**2. Combine Rules**: Merge multiple rules using logical operators (AND/OR) to form complex rule conditions.

**3. Evaluate Rule**: Evaluate a rule against given data in JSON format to determine rule fulfillment.

**4. Update Rule**: Modify existing rules, updating both name and logic to adapt to changing requirements.

**5. View Rules History**: Easily access and manage the list of created rules for reusability.


## Technology Used
- **Frontend**: HTML, CSS, and Vanilla JavaScript
- **Backend**: Node.js and Express.js
- **Database**: MongoDB for persisting rule data
- **API Integration**: Fetch API for client-server communication
- **Other Libraries**: CORS, Body-parser for request handling, and Mongoose for MongoDB interaction


## Clone the repository:
```bash
git clone https://github.com/Perumallpardhiv/Application-1-Rule-Engine-with-AST.git
```

### Setup:
```bash
npm install
npm start
```

### Rule's Creation:

| Create Rule | Combine Rules |
|------------------------|--------------------------|
| ![Create Rule](/screenshots/1.png) | ![Combine Rules](/screenshots/2.png) |
| Interface for defining a new rule with a visual syntax tree. | Feature for combining rules using logical operators to form complex conditions. |

### Rule's Changing:
| Evaluate Rule | Update Rule |
|---------------------------|------------------------|
| ![Evaluate Rule 2](/screenshots/4.png) | ![Update Rule](/screenshots/5.png) |
| Displays the evaluation of rules against given JSON data to determine fulfillment. | Interface for modifying existing rules, allowing updates to both name and logic. |

### Rule's History:
| View Rules History Screenshots | View Rules History Screenshots |
|-------------------------------|-----------------------|
| ![View History 1](/screenshots/6.png) | ![View History 2](/screenshots/7.png) |
| Displays a comprehensive history of created rules for easy management and reusability. | Displays a comprehensive history of created rules for easy management and reusability. |


### MongoDB Rules Storage:

| Rules Schema                                | Rules Detailed Summaries                                |
|--------------------------------------------------|------------------------------------------------|
| ![Screenshot](/screenshots/8.png) | ![Screenshot](/screenshots/9.png) |
|The screenshot illustrates the traditional schema structure | Showcases the efficient storage format used in MongoDB for AST Tree|


### Packages Used

| Package      |
|--------------|
| body-parser  |
| cors         |
| express      |
| mongoose     |
| nodemon      |

### Conclusion

Thank you for taking the time to review my project. I truly appreciate the opportunity to share my work, and I look forward to any feedback you may have to help me improve further.
