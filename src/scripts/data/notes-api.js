const baseUrl = 'https://notes-api.dicoding.dev/v2';

class NotesApi {
  static async getNotes(archived) {
    let response = '';
    if (!archived) {
      response = await fetch(`${baseUrl}/notes`);
    } else {
      response = await fetch(`${baseUrl}/notes/archived`);
    }

    if (!(response.status >= 200 && response.status < 300)) {
      throw new Error('Something went wrong');
    }

    const responsejson = await response.json();
    const { data: notesData } = responsejson;

    if (notesData.length == 0) {
      console.log('data kosong');
    }

    return notesData;
  }

  static async searchNotes(query, archived) {
    const notesData = await this.getNotes(archived);

    return notesData.filter((note) => {
      const loweredCaseTitle = (note.title || '-').toLowerCase();
      const noSpaceTitle = loweredCaseTitle.replace(/\s/g, '');

      const loweredCaseQuery = query.toLowerCase();
      const noSpaceQuery = loweredCaseQuery.replace(/\s/g, '');

      return noSpaceTitle.indexOf(noSpaceQuery) !== -1;
    });
  }

  static async insertNotes(note) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': '12345',
      },
      body: JSON.stringify(note),
    };

    const response = await fetch(`${baseUrl}/notes`, options);

    if (!(response.status >= 200 && response.status < 300)) {
      throw new Error('Something went wrong');
    }

    const responseJson = await response.json();
    return responseJson.message;
  }

  static async deleteNotes(noteid) {
    const options = {
      method: 'DELETE',
    };
    const response = await fetch(`${baseUrl}/notes/${noteid}`, options);
    if (!(response.status >= 200 && response.status < 300)) {
      throw new Error('Something went wrong');
    }

    const responseJson = await response.json();
    return responseJson.message;
  }

  static async archiveNotes(noteid, notearchived) {
    const options = {
      method: 'POST',
    };

    let archive = 'archive';
    if (notearchived) archive = 'unarchive';

    const response = await fetch(
      `${baseUrl}/notes/${noteid}/${archive}`,
      options,
    );
    if (!(response.status >= 200 && response.status < 300)) {
      throw new Error('Something went wrong');
    }

    const responseJson = await response.json();
    console.log(responseJson.message);
    return responseJson.message;
  }
}

export default NotesApi;
