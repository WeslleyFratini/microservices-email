import { Readable } from 'stream';
import csvParse from 'csv-parse';

import Tag from '@schemas/Tag';
import Contact from '@schemas/Contact';

class ImportContactService {
  async run(contacFileStream: Readable, tags: string[]): Promise<void> {
    const parsers = csvParse({
      delimiter: ';',
    });

    const parseCSV = contacFileStream.pipe(parsers);

    const existentTags = await Tag.find({
      title: {
        $in: tags,
      },
    });

    const tagsData = tags.map(tag => ({
      title: tag,
    }));

    const createdTags = await Tag.create(tagsData);
    const tagsIds = createdTags.map(tag => tag._id);
    
    parseCSV.on('data', line => {
      const [email] = line;

      await Contact.findOneAndUpdate(
        { email },
        { $addToSet: { tags: tagsIds } },
        { upsert: true },
      
      );
    });

    await new Promise(resolve => parseCSV.on('end', resolve));
  }
}

export default ImportContactService;
