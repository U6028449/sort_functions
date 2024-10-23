function heapify(arr, n, i, animations) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        animations.push([...arr]);
        heapify(arr, n, largest, animations);
    }
}

function heapSort(arr) {
    let n = arr.length;
    let animations = [];

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i, animations);
    }

    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        animations.push([...arr]);
        heapify(arr, i, 0, animations);
    }

    return animations;
}

function updateDiagram(arr, containerId, highlightIndex = -1) {
    let container = document.getElementById(containerId);
    container.innerHTML = '';
    arr.forEach((value, index) => {
        let div = document.createElement('div');
        div.textContent = value;
        if (index === highlightIndex) {
            div.classList.add('highlight');
        }
        container.appendChild(div);
    });
}

function animateHeapSort(arr) {
    let animations = heapSort(arr);
    let containerId = 'heap-sort-diagram';
    updateDiagram(arr, containerId);

    animations.forEach((step, index) => {
        setTimeout(() => {
            updateDiagram(step, containerId, index % step.length);
            if (index === animations.length - 1) {
                triggerFireworks();
            }
        }, index * 500); // Adjust the delay as needed
    });
}

function demonstrateHeapSort() {
    let input = document.getElementById('heap-sort-input').value;
    let arr = input.split(',').map(Number);
    document.getElementById('heap-sort-pre').textContent = arr.join(', ');
    animateHeapSort(arr);
}

function countingSortForRadix(arr, exp, animations) {
    let n = arr.length;
    let output = new Array(n).fill(0);
    let count = new Array(10).fill(0);

    for (let i = 0; i < n; i++) {
        count[Math.floor(arr[i] / exp) % 10]++;
    }

    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    for (let i = n - 1; i >= 0; i--) {
        output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
        count[Math.floor(arr[i] / exp) % 10]--;
    }

    for (let i = 0; i < n; i++) {
        arr[i] = output[i];
    }

    animations.push([...arr]);
}

function radixSort(arr) {
    let max = Math.max(...arr);
    let animations = [];

    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        countingSortForRadix(arr, exp, animations);
    }

    return animations;
}

function animateRadixSort(arr) {
    let animations = radixSort(arr);
    let container = document.getElementById('radix-sort-output');
    container.textContent = arr.join(', ');

    animations.forEach((step, index) => {
        setTimeout(() => {
            container.textContent = step.join(', ');
            if (index === animations.length - 1) {
                triggerFireworks();
            }
        }, index * 500); // Adjust the delay as needed
    });
}

function demonstrateRadixSort() {
    let input = document.getElementById('radix-sort-input').value;
    let arr = input.split(',').map(Number);
    document.getElementById('radix-sort-pre').textContent = arr.join(', ');
    animateRadixSort(arr);
}

function countingSort(arr) {
    let max = Math.max(...arr);
    let min = Math.min(...arr);
    let range = max - min + 1;
    let animations = [];

    let count = new Array(range).fill(0);
    let output = new Array(arr.length).fill(0);

    for (let i = 0; i < arr.length; i++) {
        count[arr[i] - min]++;
    }
    animations.push([...count]);

    for (let i = 1; i < count.length; i++) {
        count[i] += count[i - 1];
    }
    animations.push([...count]);

    for (let i = arr.length - 1; i >= 0; i--) {
        output[count[arr[i] - min] - 1] = arr[i];
        count[arr[i] - min]--;
        animations.push([...output]);
    }

    for (let i = 0; i < arr.length; i++) {
        arr[i] = output[i];
    }

    return animations;
}

function animateCountingSort(arr) {
    let animations = countingSort(arr);
    let container = document.getElementById('counting-sort-output');
    container.textContent = arr.join(', ');

    animations.forEach((step, index) => {
        setTimeout(() => {
            container.textContent = step.join(', ');
            if (index === animations.length - 1) {
                triggerFireworks();
            }
        }, index * 500); // Adjust the delay as needed
    });
}

function demonstrateCountingSort() {
    let input = document.getElementById('counting-sort-input').value;
    let arr = input.split(',').map(Number);
    document.getElementById('counting-sort-pre').textContent = arr.join(', ');
    animateCountingSort(arr);
}

function triggerFireworks() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}