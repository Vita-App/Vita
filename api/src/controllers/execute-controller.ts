import { Request, Response } from 'express';
import axios from 'axios';
import { JDOODLE, JDOODLE_URL } from '../config/keys';
import { getLanguageVersion, getLanguage } from '../utils/getLanguageVersion';
import { filterQuestions, renderQuestion } from '../utils/databaseQueries';
import { scrapeQuestion } from '../utils/scrapeQuestion';

export const executeController = async (req: Request, res: Response) => {
  const { script, language, stdin } = req.body;
  if (!language || !script) {
    return res.status(200).json({
      message: 'Code should not be empty and Language undefined',
    });
  }

  const response = await axios({
    method: 'POST',
    url: `${JDOODLE_URL}/execute`,
    data: {
      script: script,
      stdin: stdin,
      language: getLanguage[language],
      versionIndex: getLanguageVersion[language],
      clientId: JDOODLE.clientID,
      clientSecret: JDOODLE.clientSecret,
    },
    responseType: 'json',
  });
  res.json(response.data);
};

export const creditSpentController = async (req: Request, res: Response) => {
  const response = await axios({
    method: 'POST',
    url: `${JDOODLE_URL}/credit-spent`,
    data: {
      clientId: JDOODLE.clientID,
      clientSecret: JDOODLE.clientSecret,
    },
    responseType: 'json',
  });
  res.json(response.data);
};

export const fetchProblemsController = async (req: Request, res: Response) => {
  const { url, hostname } = req.body as Record<string, string>;
  const questionData = await scrapeQuestion(url, hostname);
  res.json(questionData);
};
