import { ProjectData } from '../src';

export const create = () => {
  const data: ProjectData = {
    name: 'EditorJS Test',
    subtitle: 'Testing an inline editor',
    modules: [
      {
        id: 0,
        name: 'EditorJS Testing',
      },
    ],
    lessons: [
      {
        'moduleId': 0,
        'id': 0,
        'name': 'Introduction',
        'content': {
          'time': 1687152070816,
          'blocks': [
            {
              'id': 'omqjErzf6N',
              'type': 'paragraph',
              'data': {
                'text': 'hello there',
              },
            },
          ],
          'version': '2.27.0',
        },
      },
      {
        'moduleId': 0,
        'id': 1,
        'name': 'Lesson 2',
        'content': {
          'time': 1687152070817,
          'blocks': [
            {
              'id': 'omqjErzf6N',
              'type': 'paragraph',
              'data': {
                'text': 'hello two',
              },
            },
          ],
          'version': '2.27.0',
        },
      },
      {
        'moduleId': 0,
        'id': 2,
        'name': 'Lesson 3',
        'content': {
          'time': 1687152070818,
          'blocks': [
            {
              'id': 'omqjErzf6N',
              'type': 'paragraph',
              'data': {
                'text': 'hello three',
              },
            },
          ],
          'version': '2.27.0',
        },
      },
      {
        "moduleId": 0,
        "id": 1,
        "name": "Second Lesson",
        "content": {
            "time": 1687152070818,
            "blocks": [
                {
                    "id": "omqjErzf68",
                    "type": "paragraph",
                    "data": {
                        "text": "there there"
                    }
                }
            ],
            "version": "2.27.0"
        }
    },
    ],
    glossary: [
      {
        id: 0,
        word: 'Discrimination',
        definition:
          'Any action that unlawfully or unjustly results in unequal treatment of persons or groups based on race, color, gender, national origin, religion, age, disability or other factors protected under federal, state or local laws, such as marital status or gender identity..',
      },
      {
        id: 1,
        word: 'Empathy',
        definition:
          'The action of understanding, being aware of, being sensitive to, and vicariously experiencing the feelings, thoughts, and experiences of another; the capacity for this.',
      },
      {
        id: 2,
        word: 'Coersion',
        definition:
          'The use of authority or force to impose an unwanted advance. The act of compelling by force of authority.',
      },
      {
        id: 3,
        word: 'Harrassment',
        definition:
          'The act of harrassing, or state of being harrassed; a feeling of intense annoyance, anxiety, or worry caused by being tormented.',
      },
      {
        id: 4,
        word: 'Agent',
        definition:
          'One who acts for, or in the place of, another, by authority from him or her; one entrusted with the business of another; a substitute; a deputy. Managers and supervisors are agents of the employer.',
      },
      {
        id: 5,
        word: 'Common Law Torts',
        definition:
          'Legal actions against civil wrongs, including assault and battery, intentional infliction of emotional distress, interference with contract and defamation. Tort actions may provide more relief than the federal and state laws.',
      },
      {
        id: 6,
        word: 'Subordinate',
        definition:
          'Placed in a lower order, class, or rank; holding a lower or inferior position. In traditional hierarchical work settings, workers are subordinate to their management.',
      },
      {
        id: 7,
        word: 'Peer',
        definition:
          'A person who is of equal standing with another in a group; one of the same rank, quality, endowments, character, etc.; an equal; a match; a mate.',
      },
      {
        id: 8,
        word: 'Third Party Harrassment',
        definition:
          '1) when a party or parties not sexually harassed directly but indirectly suffer the consequences of sexual harassment. 2) also, when a person who is not an employee of an organization but may subject an employee to harassment in a work setting (e.g., a client, vendor, customer, visitor); in which case the employer is responsible for stopping and preventing the harassment.',
      },
      {
        id: 9,
        word: 'Perspective',
        definition:
          'A way of regarding situations or topics. People interpret situations based on their beliefs and attitudes.',
      },
    ],
    resources: [
      {
        id: 0,
        filename: 'icon_1024.png',
        title: 'Mac icon',
        description: 'This is a mac icon for use in project slides.',
      },
      {
        id: 1,
        filename:
          'OSG-Logo-with-Slogan-Horizontal-_Secondary-Color-Version.png',
        title: 'OSG Logo',
        description: 'This is the OSG logo.',
      },
      {
        id: 2,
        filename: 'scrowl-notes.pdf',
        title: 'Scrowl Notes',
        description: 'Notes on next steps for Scrowl project.',
      },
    ],
  };

  return data;
};

export default {
  create,
};