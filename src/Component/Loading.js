import React from 'react';
import { Spinner } from 'reactstrap';

const Loading = (props) => {
    return (
        <main id="main">
            <section id="appointment" className="appointment">
                <div className="container">
                    <div className="section-title">
                        <Spinner color="warning" />
                    </div>

                </div>
            </section>
        </main>
    );
}

export default Loading;