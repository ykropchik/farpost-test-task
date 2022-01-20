<?php

namespace App\Controller;

use App\Service\FileService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/breefs")
 */

class BreefsController extends AbstractController
{
    public function response($data, $status = Response::HTTP_OK, $headers = []): JsonResponse
    {
        return new JsonResponse($data, $status, $headers);
    }

    /**
     * @Route("/get", name="getBreefs", methods={"GET"})
     */
    public function getBreefs(FileService $fileService): Response
    {
        $rawData = $fileService->readFile('RawData.json');
        $rawArray = json_decode($rawData, true);
        if (count($rawArray) < 11) {
            $sendingArray = $rawArray;
            $remainderArray = [];
        } else {
            $sendingArray = array_slice($rawArray, 0, 10);
            $remainderArray = array_slice($rawArray, 10, count($rawArray) - 10);
        }

        $fileService->writeFile(json_encode($remainderArray, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES), 'RawData.json');
        
        return $this->response($sendingArray);
    }

    /**
     * @Route("/send", name="sendBreefs", methods={"POST"})
     */
    public function sendBreefs(FileService $fileService, Request $request): Response
    {
        $fileService->appendFile($request->getContent(), 'ProcessedData.json');
        return $this->response($request->getContent());
    }

    /**
     * @Route("/refresh", name="refreshBreefs", methods={"GET"})
     */
    public function refreshBreefs(FileService $fileService): Response
    {
        $sourceData = $fileService->readFile('SourceData.json');
        $fileService->writeFile($sourceData, 'RawData.json');
        $fileService->writeFile('', 'ProcessedData.json');

        return $this->response('Successfully refreshed');
    }
}
