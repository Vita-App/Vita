import { Request, Response } from 'express';
import axios from 'axios';
import cheerio from 'cheerio';
import { JDOODLE, JDOODLE_URL } from '../config/keys';
import { getLanguageVersion, getLanguage } from '../utils/getLanguageVersion';

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

interface ScrapedQuestionType {
  error: boolean;
  htmlString: string;
}

export const scrapeQuestion = async (
  url: string,
  hostname: string,
): Promise<ScrapedQuestionType> => {
  if (hostname === 'codeforces.com') {
    try {
      const response = await axios.get(url);

      const $ = cheerio.load(response.data);

      const questionData = $('.problemindexholder').html();
      return questionData === null
        ? { error: true, htmlString: '' }
        : { error: false, htmlString: questionData };
    } catch (err) {
      return {
        error: true,
        htmlString: '',
      };
    }
  } else if (hostname === 'atcoder.jp') {
    try {
      const response = await axios.get(url);

      const $ = cheerio.load(response.data);
      const questionData = $('#task-statement')
        .children()
        .children('.lang-en')
        .html();

      const DelimitterCorrected =
        questionData?.replace(/<var>/g, '%%')?.replace(/<\/var>/g, '%%') || '';
      return questionData === null
        ? { error: true, htmlString: '' }
        : { error: false, htmlString: DelimitterCorrected };
    } catch (err) {
      return {
        error: true,
        htmlString: '',
      };
    }
  } else {
    return {
      error: true,
      htmlString: '',
    };
  }
};
