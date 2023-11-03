import {FC} from 'react';

interface NoAccessProps {

}

export const NoAccess: FC<NoAccessProps> = (props) => {
    const {} = props;

    return (
        <div>
            К сожалению у вас нет доступа к запрашиваемой странице
        </div>
    );
};

NoAccess.displayName = 'NoAccess';