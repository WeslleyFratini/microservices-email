import mongoose from 'mongoose';
import { Readable } from 'stream';

import ImportContactService from '@services/ImportContactService';

import Contact from '@schemas/Contact';
import Tag from '@schemas/Tag';

describe('Import', () => {
  beforeAll(async () => {

  });

  afterAll(async () => {

  });

  beforeEach(async () => {
    await Contact.deleteMany({});
    await Tag.deleteMany({});
  });

  it('should be able to import new contacts', async () => {
    const contactsFileStream = Readable.from([
      'weslley@gmail.com.br\n',
      'carlos@gmail.com.br\n',
      'fulano@gmail.com.br\n',
    ]);

    const imporContacts = new ImportContactService();

    await Tag.create({ title: 'Students '});

    await imporContacts.run(contactsFileStream, ['Students', 'Class A']);

    const createdTags = await Tag.find({}).lean();

    expect(createdTags).toEqual(
      expect.arrayContaining([
      expect.objectContaining({ title: 'Students' }),
      expect.objectContaining({ title: 'Classe A' }),
      ]),
    );

    const createdTagsIds = createdTags.map(tag => tag._id);

    const createdContacts = await Contact.find({}).lean();

    expect(createdContacts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
        email: 'weslley@gmail.com',
        tags: createdTagsIds,
      }),
      expect.objectContaining({        
          email: 'carlos@gmail.com',
          tags: createdTagsIds,
        }),
        expect.objectContaining({          
            email: 'fulano@gmail.com',
            tags: createdTagsIds,
          }),
      ]),
    );
  });

  it('should not recreate tags that already exists', async () => {

    const contactsFileStream = Readable.from([
      'weslley@gmail.com.br\n',
      'carlos@gmail.com.br\n',
      'fulano@gmail.com.br\n',
    ]);

    const imporContacts = new ImportContactService();

    await Tag.create({ title: 'Students' });

    await imporContacts.run(contactsFileStream, ['Students', 'Class A']);

    const createdTags = await Tag.find({}).lean();

    expect(createdTags).toEqual([
      expect.objectContaining({ title: 'Students '}),
      expect.objectContaining({ title: 'Class A'}),
    ])
  });

  it('should not recreate contacts that already exists', async () =>{

    const contactsFileStream = Readable.from([
      'weslley@gmail.com.br\n',
      'carlos@gmail.com.br\n',
      'fulano@gmail.com.br\n',
    ]);

    const imporContacts = new ImportContactService();

    const tag = await Tag.create({ title: 'Students' });
    await Contact.create({ email: 'weslley@gmail.com', tags: [tag._id]});

    await imporContacts.run(contactsFileStream, ['Class A']);

    const contact = await Contact.find({ 
      email: 'weslley@gmail.com'});

      .populate('tags')
      .lean();

    expect(contacts.length).toBe(1)
    expect(contacts[0].tags).toEqual([
      expect.objectContaining({ title: 'Students'}),
      expect.objectContaining({ title: 'Class A'}),
    ]);
  });
});

