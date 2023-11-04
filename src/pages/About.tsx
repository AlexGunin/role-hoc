import {withRole} from "../hocs/withRole.tsx";

interface AboutProps {

}

export const About = (props: AboutProps) => {
    const {} = props;

    return (
        <div>
            About
        </div>
    );
};

About.displayName = 'About';

About.withRole = withRole({Component: About, role: 'admin', behavior: "no-access-page"})