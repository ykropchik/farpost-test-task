<?php

namespace App\Service;

class FileService
{
    private $targetDirectory;

    public function __construct($targetDirectory)
    {
        $this->targetDirectory = $targetDirectory;
    }

    public function readFile($filename) {
        return file_get_contents($this->targetDirectory . '/' . $filename);
    }

    public function writeFile($data, $filename) {
        file_put_contents($this->targetDirectory . '/' . $filename, $data);
    }
}