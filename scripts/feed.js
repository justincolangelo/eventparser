Handlebars.registerHelper('getDate', (dateString) => {
    return new Date(dateString).toLocaleDateString();
});

$(() => {
    $('.np-parseFeed').on('click', () => {
        $.ajax({
            method: 'get',
            url: '/parseFeed',
            success: (feed) => {
                let source = $('#np-events-template').html();
                let template = Handlebars.compile(source);
                let html = template({ items: feed });

                console.log(html, source, template);

                $('.np-events-feed').html(html);
            },
            error: () => {
                console.log('There was an error');
            }
        });
    });
});
