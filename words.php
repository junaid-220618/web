<?php
$level = $_GET['level'] ?? 'medium';

$words = [
  'easy' => [
    ['word' => 'cat', 'hint' => 'A small domestic animal'],
    ['word' => 'dog', 'hint' => 'A loyal pet'],
    ['word' => 'sun', 'hint' => 'Star at the center of our solar system'],
    ['word' => 'fish', 'hint' => 'Lives in water'],
    ['word' => 'tree', 'hint' => 'Tall plant with leaves'],
    ['word' => 'book', 'hint' => 'Contains written pages'],
    ['word' => 'milk', 'hint' => 'White liquid from cows'],
    ['word' => 'rain', 'hint' => 'Water falling from the sky'],
    ['word' => 'bird', 'hint' => 'Animal with wings'],
    ['word' => 'ball', 'hint' => 'Round object used in games'],
  ],
  'medium' => [
    ['word' => 'wizard', 'hint' => 'A person with magical powers'],
    ['word' => 'console', 'hint' => 'Device used for gaming'],
    ['word' => 'element', 'hint' => 'Basic building block of matter'],
    ['word' => 'function', 'hint' => 'Reusable block of code'],
    ['word' => 'planet', 'hint' => 'Orbits around a star'],
    ['word' => 'guitar', 'hint' => 'A musical instrument with strings'],
    ['word' => 'python', 'hint' => 'Popular programming language'],
    ['word' => 'bridge', 'hint' => 'Structure connecting two places'],
    ['word' => 'driver', 'hint' => 'Software that controls hardware'],
    ['word' => 'signal', 'hint' => 'Used in communication'],
  ],
  'hard' => [
    ['word' => 'cryptography', 'hint' => 'Science of secure communication'],
    ['word' => 'synchronization', 'hint' => 'Keeping events in time'],
    ['word' => 'asynchronous', 'hint' => 'Not happening at the same time'],
    ['word' => 'constructor', 'hint' => 'Special method in OOP'],
    ['word' => 'polymorphism', 'hint' => 'OOP feature: many forms'],
    ['word' => 'inheritance', 'hint' => 'OOP feature: child gets properties'],
    ['word' => 'multithreading', 'hint' => 'Parallel execution of tasks'],
    ['word' => 'architecture', 'hint' => 'Design of a system or building'],
    ['word' => 'sustainability', 'hint' => 'Meeting needs without harming future'],
    ['word' => 'neuroscience', 'hint' => 'Study of the nervous system'],
  ]
];

$list = $words[$level] ?? $words['medium'];
$item = $list[array_rand($list)];

echo json_encode($item);
