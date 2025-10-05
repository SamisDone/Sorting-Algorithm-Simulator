# Sorting Algorithm Playground

A beautiful, interactive web-based visualization tool for understanding and comparing different sorting algorithms in real-time.

**Created by Samonwita**

![Sorting Algorithm Visualizer]
![HTML5]
![CSS3]
![JavaScript]

## 🌟 Features

- **8 Sorting Algorithms** with full visualization
- **Real-time Statistics** tracking comparisons, swaps, and execution time
- **Interactive Controls** for speed, array size, and algorithm selection
- **Color-coded Animations**:
  - 🟡 Yellow: Elements being compared
  - 🔴 Red: Elements being swapped
  - 🟢 Green: Sorted elements
  - 🔵 Blue: Unsorted elements
- **Pause/Resume Functionality** to analyze algorithms step-by-step
- **Responsive Design** that works on desktop and mobile devices
- **Algorithm Information** with time and space complexity details

## 📊 Supported Algorithms

### Comparison-Based Algorithms

1. **Bubble Sort**
   - Time: O(n²) average/worst, O(n) best
   - Space: O(1)
   - Simple comparison-based algorithm

2. **Selection Sort**
   - Time: O(n²) all cases
   - Space: O(1)
   - Finds minimum and swaps

3. **Insertion Sort**
   - Time: O(n²) average/worst, O(n) best
   - Space: O(1)
   - Builds sorted array incrementally

4. **Merge Sort**
   - Time: O(n log n) all cases
   - Space: O(n)
   - Divide-and-conquer algorithm

5. **Quick Sort**
   - Time: O(n log n) average, O(n²) worst
   - Space: O(log n)
   - Partition-based sorting

6. **Heap Sort**
   - Time: O(n log n) all cases
   - Space: O(1)
   - Uses binary heap structure

### Non-Comparison Based Algorithms

7. **Counting Sort**
   - Time: O(n + k) where k is range
   - Space: O(k)
   - Counts occurrences of each element

8. **Radix Sort**
   - Time: O(nk) where k is number of digits
   - Space: O(n + k)
   - Sorts by individual digits

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No installation or dependencies required!

### How to Use

1. **Clone or download** this repository
2. **Open** `index.html` in your web browser
3. **Select** an algorithm from the dropdown menu
4. **Adjust** speed and array size using the sliders
5. **Click** "Start Sorting" to begin visualization
6. **Use** pause/resume to analyze step-by-step
7. **Generate** new random arrays to test different scenarios

### Controls

- **Algorithm Selector**: Choose which sorting algorithm to visualize
- **Speed Slider**: Adjust animation speed (1-10)
- **Array Size Slider**: Set number of elements to sort (10-100)
- **Start Sorting**: Begin the visualization
- **Pause/Resume**: Pause or continue the sorting process
- **Reset**: Stop sorting and reset to initial state
- **Generate New Array**: Create a new random array

## 🎨 User Interface

The application features a modern, dark-themed interface with:
- Gradient headers and accent colors
- Smooth animations and transitions
- Real-time complexity information display
- Live statistics counter
- Responsive layout for all screen sizes

## 📁 Project Structure

```
Sorting Simulator/
│
├── index.html          # Main HTML structure
├── styles.css          # Styling and animations
├── script.js           # Sorting algorithms and visualization logic
└── README.md           # Project documentation
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with CSS variables, flexbox, and grid
- **Vanilla JavaScript**: ES6+ features, async/await, classes
- **No external libraries**: Pure, dependency-free implementation

## 📚 Educational Value

This tool is perfect for:
- **Students** learning data structures and algorithms
- **Teachers** demonstrating algorithm behavior
- **Developers** preparing for technical interviews
- **Anyone** curious about how sorting algorithms work

## 🎯 Algorithm Complexity Comparison

| Algorithm      | Best Case    | Average Case | Worst Case   | Space    | Stable |
|---------------|--------------|--------------|--------------|----------|--------|
| Bubble Sort   | O(n)         | O(n²)        | O(n²)        | O(1)     | Yes    |
| Selection Sort| O(n²)        | O(n²)        | O(n²)        | O(1)     | No     |
| Insertion Sort| O(n)         | O(n²)        | O(n²)        | O(1)     | Yes    |
| Merge Sort    | O(n log n)   | O(n log n)   | O(n log n)   | O(n)     | Yes    |
| Quick Sort    | O(n log n)   | O(n log n)   | O(n²)        | O(log n) | No     |
| Heap Sort     | O(n log n)   | O(n log n)   | O(n log n)   | O(1)     | No     |
| Counting Sort | O(n + k)     | O(n + k)     | O(n + k)     | O(k)     | Yes    |
| Radix Sort    | O(nk)        | O(nk)        | O(nk)        | O(n + k) | Yes    |



## 👤 Author

**Samonwita Sarker Tanu**

