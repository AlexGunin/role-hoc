import {FC} from 'react';

interface NotFoundProps {

}

export const NotFound: FC<NotFoundProps> = (props) => {
    const {} = props;

    return (
        <div>
           Запрашиваемая страница не найдена
        </div>
    );
};

NotFound.displayName = 'NotFound';