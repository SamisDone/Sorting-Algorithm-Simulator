class SortingVisualizer {
    constructor() {
        this.array = [];
        this.arraySize = 50;
        this.isSorting = false;
        this.isPaused = false;
        this.speed = 2; // Further reduced default animation speed
        this.currentAlgorithm = 'bubble';
        this.comparisons = 0;
        this.swaps = 0;
        this.startTime = 0;
        this.timerInterval = null;
        
        this.initializeElements();
        this.bindEvents();
        this.generateNewArray();
        this.updateAlgorithmInfo();
    }
    
    initializeElements() {
        this.arrayContainer = document.getElementById('array-container');
        this.algorithmSelect = document.getElementById('algorithm-select');
        this.speedSlider = document.getElementById('speed-slider');
        this.speedValue = document.getElementById('speed-value');
        this.arraySizeSlider = document.getElementById('array-size');
        this.arraySizeValue = document.getElementById('array-size-value');
        this.startBtn = document.getElementById('start-btn');
        this.pauseBtn = document.getElementById('pause-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.generateBtn = document.getElementById('generate-btn');
        this.currentAlgorithmDisplay = document.getElementById('current-algorithm');
        this.algorithmDescription = document.getElementById('algorithm-description');
        this.comparisonsCount = document.getElementById('comparisons-count');
        this.swapsCount = document.getElementById('swaps-count');
        this.timeElapsed = document.getElementById('time-elapsed');
        
        // Complexity elements
        this.bestCase = document.getElementById('best-case');
        this.averageCase = document.getElementById('average-case');
        this.worstCase = document.getElementById('worst-case');
        this.spaceComplexity = document.getElementById('space-complexity');
    }
    
    bindEvents() {
        this.algorithmSelect.addEventListener('change', () => {
            this.currentAlgorithm = this.algorithmSelect.value;
            this.updateAlgorithmInfo();
            this.reset();
        });
        
        this.speedValue.textContent = this.speed;
        this.speedSlider.addEventListener('input', () => {
            this.speed = parseInt(this.speedSlider.value);
            this.speedValue.textContent = this.speed;
        });
        
        this.arraySizeSlider.addEventListener('input', () => {
            this.arraySize = parseInt(this.arraySizeSlider.value);
            this.arraySizeValue.textContent = this.arraySize;
        });
        
        this.startBtn.addEventListener('click', () => this.startSorting());
        this.pauseBtn.addEventListener('click', () => this.pauseSorting());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.generateBtn.addEventListener('click', () => this.generateNewArray());
        
        this.arraySizeSlider.addEventListener('change', () => this.generateNewArray());
    }
    
    generateNewArray() {
        if (this.isSorting) return;
        
        this.array = [];
        for (let i = 0; i < this.arraySize; i++) {
            this.array.push(Math.floor(Math.random() * 300) + 20);
        }
        
        this.renderArray();
        this.resetStats();
    }
    
    renderArray() {
        this.arrayContainer.innerHTML = '';
        const maxValue = Math.max(...this.array);
        const containerWidth = this.arrayContainer.clientWidth;
        const barWidth = Math.max(8, (containerWidth - (this.array.length * 2)) / this.array.length);
        
        this.array.forEach((value, index) => {
            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.height = `${(value / maxValue) * 100}%`;
            bar.style.width = `${barWidth}px`;
            bar.dataset.index = index;
            bar.dataset.value = value;
            
            // Add value label on top for small arrays
            if (this.array.length <= 20) {
                const label = document.createElement('div');
                label.className = 'bar-label';
                label.textContent = value;
                label.style.fontSize = '10px';
                label.style.position = 'absolute';
                label.style.top = '-20px';
                label.style.left = '50%';
                label.style.transform = 'translateX(-50%)';
                label.style.color = '#fff';
                bar.appendChild(label);
            }
            
            this.arrayContainer.appendChild(bar);
        });
    }
    
    async startSorting() {
        if (this.isSorting) return;
        
        this.isSorting = true;
        this.isPaused = false;

        this.resetStats(); // Reset stats before starting
        this.startTime = Date.now();
        this.timerInterval = setInterval(() => this.updateStats(), 100);
        
        this.startBtn.disabled = true;
        this.pauseBtn.disabled = false;
        this.generateBtn.disabled = true;
        this.algorithmSelect.disabled = true;
        this.arraySizeSlider.disabled = true;
        
        switch (this.currentAlgorithm) {
            case 'bubble':
                await this.bubbleSort();
                break;
            case 'selection':
                await this.selectionSort();
                break;
            case 'insertion':
                await this.insertionSort();
                break;
            case 'merge':
                await this.mergeSort();
                break;
            case 'quick':
                await this.quickSort();
                break;
            case 'heap':
                await this.heapSort();
                break;
            case 'counting':
                await this.countingSort();
                break;
            case 'radix':
                await this.radixSort();
                break;
        }
        
        clearInterval(this.timerInterval);
        this.isSorting = false;
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
        this.generateBtn.disabled = false;
        this.algorithmSelect.disabled = false;
        this.arraySizeSlider.disabled = false;
        
        // Mark all bars as sorted
        const bars = document.querySelectorAll('.bar');
        bars.forEach(bar => bar.classList.add('sorted'));
    }
    
    pauseSorting() {
        this.isPaused = !this.isPaused;
        this.pauseBtn.textContent = this.isPaused ? 'Resume' : 'Pause';
    }
    
    reset() {
        clearInterval(this.timerInterval);
        this.isSorting = false;
        this.isPaused = false;
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
        this.generateBtn.disabled = false;
        this.algorithmSelect.disabled = false;
        this.arraySizeSlider.disabled = false;
        this.pauseBtn.textContent = 'Pause';
        
        this.resetStats();
        this.renderArray();
    }
    
    resetStats() {
        this.comparisons = 0;
        this.swaps = 0;
        this.startTime = 0;
        this.comparisonsCount.textContent = '0';
        this.swapsCount.textContent = '0';
        this.timeElapsed.textContent = '0 ms';
    }
    
    updateStats() {
        this.comparisonsCount.textContent = this.comparisons;
        this.swapsCount.textContent = this.swaps;
        const elapsed = this.startTime ? Date.now() - this.startTime : 0;
        this.timeElapsed.textContent = `${elapsed} ms`;
    }
    
    updateAlgorithmInfo() {
        const info = {
            bubble: {
                name: 'Bubble Sort',
                description: 'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.',
                complexity: {
                    best: 'O(n)',
                    average: 'O(n²)',
                    worst: 'O(n²)',
                    space: 'O(1)'
                }
            },
            merge: {
                name: 'Merge Sort',
                description: 'A highly efficient, comparison-based, divide-and-conquer sorting algorithm. It divides the unsorted list into n sub-lists, each containing one element, and then repeatedly merges sub-lists to produce new sorted sub-lists until there is only one sub-list remaining.',
                complexity: {
                    best: 'O(n log n)',
                    average: 'O(n log n)',
                    worst: 'O(n log n)',
                    space: 'O(n)'
                }
            },
            quick: {
                name: 'Quick Sort',
                description: 'An efficient sorting algorithm that uses a divide-and-conquer approach. It works by selecting a \'pivot\' element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot.',
                complexity: {
                    best: 'O(n log n)',
                    average: 'O(n log n)',
                    worst: 'O(n²)',
                    space: 'O(log n)'
                }
            },
            selection: {
                name: 'Selection Sort',
                description: 'A simple comparison-based sorting algorithm. It divides the list into a sorted and unsorted region. It repeatedly selects the smallest (or largest) element from the unsorted region and moves it to the end of the sorted region.',
                complexity: {
                    best: 'O(n²)',
                    average: 'O(n²)',
                    worst: 'O(n²)',
                    space: 'O(1)'
                }
            },
            insertion: {
                name: 'Insertion Sort',
                description: 'A simple sorting algorithm that builds the final sorted array one item at a time. It iterates through the array, growing the sorted portion behind it. For each element, it finds the appropriate position in the sorted portion and inserts it there.',
                complexity: {
                    best: 'O(n)',
                    average: 'O(n²)',
                    worst: 'O(n²)',
                    space: 'O(1)'
                }
            },
            heap: {
                name: 'Heap Sort',
                description: 'A comparison-based sorting algorithm that uses a binary heap data structure. It divides its input into a sorted and unsorted region, and iteratively shrinks the unsorted region by extracting the largest element and moving it to the sorted region.',
                complexity: {
                    best: 'O(n log n)',
                    average: 'O(n log n)',
                    worst: 'O(n log n)',
                    space: 'O(1)'
                }
            },
            counting: {
                name: 'Counting Sort',
                description: 'A non-comparison based sorting algorithm. It operates by counting the number of objects that possess distinct key values, and then applying prefix sum on those counts to determine the positions of each key value in the output sequence.',
                complexity: {
                    best: 'O(n + k)',
                    average: 'O(n + k)',
                    worst: 'O(n + k)',
                    space: 'O(k)'
                }
            },
            radix: {
                name: 'Radix Sort',
                description: 'A non-comparison based sorting algorithm that sorts data with integer keys by grouping the keys by individual digits which share the same significant position and value. It processes digits from least significant to most significant.',
                complexity: {
                    best: 'O(nk)',
                    average: 'O(nk)',
                    worst: 'O(nk)',
                    space: 'O(n + k)'
                }
            }
        };

        const current = info[this.currentAlgorithm];
        this.currentAlgorithmDisplay.textContent = current.name;
        this.algorithmDescription.textContent = current.description;
        this.bestCase.textContent = current.complexity.best;
        this.averageCase.textContent = current.complexity.average;
        this.worstCase.textContent = current.complexity.worst;
        this.spaceComplexity.textContent = current.complexity.space;
    }
    
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms / this.speed));
    }
    
    async bubbleSort() {
        const bars = document.querySelectorAll('.bar');
        const n = this.array.length;
        
        for (let i = 0; i < n - 1 && !this.isPaused; i++) {
            for (let j = 0; j < n - i - 1 && !this.isPaused; j++) {
                // Highlight comparing bars
                bars[j].classList.add('comparing');
                bars[j + 1].classList.add('comparing');
                
                this.comparisons++;
                this.updateStats();
                
                await this.sleep(400);
                
                if (this.array[j] > this.array[j + 1]) {
                    // Swap elements
                    [this.array[j], this.array[j + 1]] = [this.array[j + 1], this.array[j]];
                    
                    // Animate swap
                    bars[j].classList.add('swapping');
                    bars[j + 1].classList.add('swapping');
                    
                    this.swaps++;
                    this.updateStats();
                    
                    await this.sleep(300);
                    
                    // Swap DOM elements for smooth animation
                    const temp = bars[j].style.height;
                    bars[j].style.height = bars[j + 1].style.height;
                    bars[j + 1].style.height = temp;
                    
                    // Update data attributes
                    [bars[j].dataset.value, bars[j + 1].dataset.value] = [bars[j + 1].dataset.value, bars[j].dataset.value];
                    
                    await this.sleep(600);
                    
                    bars[j].classList.remove('swapping');
                    bars[j + 1].classList.remove('swapping');
                }
                
                bars[j].classList.remove('comparing');
                bars[j + 1].classList.remove('comparing');
            }
            
            // Mark last element as sorted
            if (bars[n - i - 1]) {
                bars[n - i - 1].classList.add('sorted');
            }
        }
    }
    
    async mergeSort() {
        await this.mergeSortRecursive(0, this.array.length - 1);
    }
    
    async mergeSortRecursive(left, right) {
        if (left >= right || this.isPaused) return;
        
        const mid = Math.floor((left + right) / 2);
        
        await this.mergeSortRecursive(left, mid);
        await this.mergeSortRecursive(mid + 1, right);
        await this.merge(left, mid, right);
    }
    
    async merge(left, mid, right) {
        const bars = document.querySelectorAll('.bar');
        const leftArray = this.array.slice(left, mid + 1);
        const rightArray = this.array.slice(mid + 1, right + 1);
        
        let i = 0, j = 0, k = left;
        
        while (i < leftArray.length && j < rightArray.length && !this.isPaused) {
            bars[k].classList.add('comparing');
            bars[k + j + i + 1]?.classList.add('comparing');
            
            this.comparisons++;
            this.updateStats();
            
            await this.sleep(400);
            
            if (leftArray[i] <= rightArray[j]) {
                this.array[k] = leftArray[i];
                bars[k].style.height = `${(leftArray[i] / Math.max(...this.array)) * 100}%`;
                bars[k].dataset.value = leftArray[i];
                i++;
            } else {
                this.array[k] = rightArray[j];
                bars[k].style.height = `${(rightArray[j] / Math.max(...this.array)) * 100}%`;
                bars[k].dataset.value = rightArray[j];
                j++;
                this.swaps++;
                this.updateStats();
            }
            
            bars[k].classList.remove('comparing');
            bars[k].classList.add('sorted');
            k++;
            
            await this.sleep(600);
        }
        
        while (i < leftArray.length && !this.isPaused) {
            this.array[k] = leftArray[i];
            bars[k].style.height = `${(leftArray[i] / Math.max(...this.array)) * 100}%`;
            bars[k].dataset.value = leftArray[i];
            bars[k].classList.add('sorted');
            i++;
            k++;
            await this.sleep(400);
        }
        
        while (j < rightArray.length && !this.isPaused) {
            this.array[k] = rightArray[j];
            bars[k].style.height = `${(rightArray[j] / Math.max(...this.array)) * 100}%`;
            bars[k].dataset.value = rightArray[j];
            bars[k].classList.add('sorted');
            j++;
            k++;
            await this.sleep(400);
        }
    }
    
    async quickSort() {
        await this.quickSortRecursive(0, this.array.length - 1);
    }
    
    async quickSortRecursive(low, high) {
        if (low < high && !this.isPaused) {
            const pi = await this.partition(low, high);
            await this.quickSortRecursive(low, pi - 1);
            await this.quickSortRecursive(pi + 1, high);
        }
    }
    
    async partition(low, high) {
        const bars = document.querySelectorAll('.bar');
        const pivot = this.array[high];
        
        bars[high].classList.add('sorted'); // Mark pivot as sorted
        let i = low - 1;
        
        for (let j = low; j < high && !this.isPaused; j++) {
            bars[j].classList.add('comparing');
            bars[high].classList.add('comparing');
            
            this.comparisons++;
            this.updateStats();
            
            await this.sleep(600);
            
            if (this.array[j] < pivot) {
                i++;
                if (i !== j) {
                    // Swap elements
                    [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
                    
                    // Animate swap
                    bars[i].classList.add('swapping');
                    bars[j].classList.add('swapping');
                    
                    this.swaps++;
                    this.updateStats();
                    
                    await this.sleep(300);
                    
                    // Swap heights
                    const temp = bars[i].style.height;
                    bars[i].style.height = bars[j].style.height;
                    bars[j].style.height = temp;
                    
                    // Update data attributes
                    [bars[i].dataset.value, bars[j].dataset.value] = [bars[j].dataset.value, bars[i].dataset.value];
                    
                    await this.sleep(600);
                    
                    bars[i].classList.remove('swapping');
                    bars[j].classList.remove('swapping');
                }
            }
            
            bars[j].classList.remove('comparing');
            bars[high].classList.remove('comparing');
        }
        
        // Place pivot in correct position
        if (i + 1 !== high) {
            [this.array[i + 1], this.array[high]] = [this.array[high], this.array[i + 1]];
            
            bars[i + 1].classList.add('swapping');
            bars[high].classList.add('swapping');
            
            await this.sleep(600);
            
            const temp = bars[i + 1].style.height;
            bars[i + 1].style.height = bars[high].style.height;
            bars[high].style.height = temp;
            
            [bars[i + 1].dataset.value, bars[high].dataset.value] = [bars[high].dataset.value, bars[i + 1].dataset.value];
            
            await this.sleep(600);
            
            bars[i + 1].classList.remove('swapping');
            bars[high].classList.remove('swapping');
        }
        
        return i + 1;
    }
    
    async selectionSort() {
        const bars = document.querySelectorAll('.bar');
        const n = this.array.length;
        
        for (let i = 0; i < n - 1 && !this.isPaused; i++) {
            let minIdx = i;
            bars[i].classList.add('comparing');
            
            // Find minimum element in unsorted portion
            for (let j = i + 1; j < n && !this.isPaused; j++) {
                bars[j].classList.add('comparing');
                
                this.comparisons++;
                this.updateStats();
                
                await this.sleep(400);
                
                if (this.array[j] < this.array[minIdx]) {
                    if (minIdx !== i) {
                        bars[minIdx].classList.remove('comparing');
                    }
                    minIdx = j;
                } else {
                    bars[j].classList.remove('comparing');
                }
            }
            
            // Swap minimum element with first element
            if (minIdx !== i) {
                [this.array[i], this.array[minIdx]] = [this.array[minIdx], this.array[i]];
                
                bars[i].classList.add('swapping');
                bars[minIdx].classList.add('swapping');
                
                this.swaps++;
                this.updateStats();
                
                await this.sleep(300);
                
                // Swap heights
                const temp = bars[i].style.height;
                bars[i].style.height = bars[minIdx].style.height;
                bars[minIdx].style.height = temp;
                
                [bars[i].dataset.value, bars[minIdx].dataset.value] = [bars[minIdx].dataset.value, bars[i].dataset.value];
                
                await this.sleep(600);
                
                bars[minIdx].classList.remove('swapping', 'comparing');
                bars[i].classList.remove('swapping');
            }
            
            bars[i].classList.remove('comparing');
            bars[i].classList.add('sorted');
        }
        
        // Mark last element as sorted
        if (bars[n - 1]) {
            bars[n - 1].classList.add('sorted');
        }
    }
    
    async insertionSort() {
        const bars = document.querySelectorAll('.bar');
        const n = this.array.length;
        
        bars[0].classList.add('sorted');
        
        for (let i = 1; i < n && !this.isPaused; i++) {
            const key = this.array[i];
            const keyHeight = bars[i].style.height;
            let j = i - 1;
            
            bars[i].classList.add('comparing');
            await this.sleep(400);
            
            // Move elements greater than key one position ahead
            while (j >= 0 && !this.isPaused) {
                bars[j].classList.add('comparing');
                
                this.comparisons++;
                this.updateStats();
                
                await this.sleep(400);
                
                if (this.array[j] > key) {
                    this.array[j + 1] = this.array[j];
                    
                    bars[j].classList.add('swapping');
                    bars[j + 1].classList.add('swapping');
                    
                    this.swaps++;
                    this.updateStats();
                    
                    await this.sleep(300);
                    
                    // Shift element
                    bars[j + 1].style.height = bars[j].style.height;
                    bars[j + 1].dataset.value = bars[j].dataset.value;
                    
                    await this.sleep(400);
                    
                    bars[j].classList.remove('swapping', 'comparing');
                    bars[j + 1].classList.remove('swapping');
                    
                    j--;
                } else {
                    bars[j].classList.remove('comparing');
                    break;
                }
            }
            
            // Place key at its correct position
            this.array[j + 1] = key;
            bars[j + 1].style.height = keyHeight;
            bars[j + 1].dataset.value = key;
            bars[j + 1].classList.remove('comparing');
            bars[j + 1].classList.add('sorted');
            
            await this.sleep(400);
        }
    }
    
    async heapSort() {
        const bars = document.querySelectorAll('.bar');
        const n = this.array.length;
        
        // Build max heap
        for (let i = Math.floor(n / 2) - 1; i >= 0 && !this.isPaused; i--) {
            await this.heapify(n, i);
        }
        
        // Extract elements from heap one by one
        for (let i = n - 1; i > 0 && !this.isPaused; i--) {
            // Move current root to end
            [this.array[0], this.array[i]] = [this.array[i], this.array[0]];
            
            bars[0].classList.add('swapping');
            bars[i].classList.add('swapping');
            
            this.swaps++;
            this.updateStats();
            
            await this.sleep(300);
            
            // Swap heights
            const temp = bars[0].style.height;
            bars[0].style.height = bars[i].style.height;
            bars[i].style.height = temp;
            
            [bars[0].dataset.value, bars[i].dataset.value] = [bars[i].dataset.value, bars[0].dataset.value];
            
            await this.sleep(600);
            
            bars[0].classList.remove('swapping');
            bars[i].classList.remove('swapping');
            bars[i].classList.add('sorted');
            
            // Heapify root element
            await this.heapify(i, 0);
        }
        
        bars[0].classList.add('sorted');
    }
    
    async heapify(n, i) {
        const bars = document.querySelectorAll('.bar');
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        
        bars[i].classList.add('comparing');
        
        if (left < n) {
            bars[left].classList.add('comparing');
            this.comparisons++;
            this.updateStats();
            await this.sleep(300);
            
            if (this.array[left] > this.array[largest]) {
                largest = left;
            }
            bars[left].classList.remove('comparing');
        }
        
        if (right < n) {
            bars[right].classList.add('comparing');
            this.comparisons++;
            this.updateStats();
            await this.sleep(300);
            
            if (this.array[right] > this.array[largest]) {
                largest = right;
            }
            bars[right].classList.remove('comparing');
        }
        
        if (largest !== i && !this.isPaused) {
            [this.array[i], this.array[largest]] = [this.array[largest], this.array[i]];
            
            bars[i].classList.add('swapping');
            bars[largest].classList.add('swapping');
            
            this.swaps++;
            this.updateStats();
            
            await this.sleep(300);
            
            const temp = bars[i].style.height;
            bars[i].style.height = bars[largest].style.height;
            bars[largest].style.height = temp;
            
            [bars[i].dataset.value, bars[largest].dataset.value] = [bars[largest].dataset.value, bars[i].dataset.value];
            
            await this.sleep(400);
            
            bars[i].classList.remove('swapping', 'comparing');
            bars[largest].classList.remove('swapping');
            
            await this.heapify(n, largest);
        } else {
            bars[i].classList.remove('comparing');
        }
    }
    
    async countingSort() {
        const bars = document.querySelectorAll('.bar');
        const n = this.array.length;
        const maxValue = Math.max(...this.array);
        const minValue = Math.min(...this.array);
        const range = maxValue - minValue + 1;
        
        // Create count array
        const count = new Array(range).fill(0);
        const output = new Array(n);
        
        // Store count of each element
        for (let i = 0; i < n && !this.isPaused; i++) {
            bars[i].classList.add('comparing');
            count[this.array[i] - minValue]++;
            this.comparisons++;
            this.updateStats();
            await this.sleep(200);
            bars[i].classList.remove('comparing');
        }
        
        // Change count[i] so that it contains actual position
        for (let i = 1; i < range; i++) {
            count[i] += count[i - 1];
        }
        
        // Build output array
        for (let i = n - 1; i >= 0 && !this.isPaused; i--) {
            bars[i].classList.add('comparing');
            output[count[this.array[i] - minValue] - 1] = this.array[i];
            count[this.array[i] - minValue]--;
            await this.sleep(300);
            bars[i].classList.remove('comparing');
        }
        
        // Copy output array to original array and update visualization
        for (let i = 0; i < n && !this.isPaused; i++) {
            this.array[i] = output[i];
            
            bars[i].classList.add('swapping');
            this.swaps++;
            this.updateStats();
            
            await this.sleep(300);
            
            bars[i].style.height = `${(output[i] / maxValue) * 100}%`;
            bars[i].dataset.value = output[i];
            
            await this.sleep(400);
            
            bars[i].classList.remove('swapping');
            bars[i].classList.add('sorted');
        }
    }
    
    async radixSort() {
        const bars = document.querySelectorAll('.bar');
        const maxValue = Math.max(...this.array);
        
        // Do counting sort for every digit
        for (let exp = 1; Math.floor(maxValue / exp) > 0; exp *= 10) {
            if (this.isPaused) break;
            await this.countingSortByDigit(exp);
        }
    }
    
    async countingSortByDigit(exp) {
        const bars = document.querySelectorAll('.bar');
        const n = this.array.length;
        const output = new Array(n);
        const count = new Array(10).fill(0);
        const maxValue = Math.max(...this.array);
        
        // Store count of occurrences
        for (let i = 0; i < n && !this.isPaused; i++) {
            const digit = Math.floor(this.array[i] / exp) % 10;
            count[digit]++;
            
            bars[i].classList.add('comparing');
            this.comparisons++;
            this.updateStats();
            await this.sleep(200);
            bars[i].classList.remove('comparing');
        }
        
        // Change count[i] for actual position
        for (let i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }
        
        // Build output array
        for (let i = n - 1; i >= 0 && !this.isPaused; i--) {
            const digit = Math.floor(this.array[i] / exp) % 10;
            output[count[digit] - 1] = this.array[i];
            count[digit]--;
            
            bars[i].classList.add('comparing');
            await this.sleep(200);
            bars[i].classList.remove('comparing');
        }
        
        // Copy output array to original array
        for (let i = 0; i < n && !this.isPaused; i++) {
            this.array[i] = output[i];
            
            bars[i].classList.add('swapping');
            this.swaps++;
            this.updateStats();
            
            await this.sleep(300);
            
            bars[i].style.height = `${(output[i] / maxValue) * 100}%`;
            bars[i].dataset.value = output[i];
            
            await this.sleep(300);
            
            bars[i].classList.remove('swapping');
        }
    }
}

// Initialize the visualizer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new SortingVisualizer();
});
