<template>
    <mdb-navbar position="top" color="orange" scrolling class="navbar-light lighten-5">
        <mdb-navbar-toggler>
            <mdb-navbar-nav center color="blue-grey">
                <mdb-nav-item :to="{ name: 'search-repo' }" waves-fixed active class="active"
                    >Search Repo
                </mdb-nav-item>
                <mdb-nav-item :to="{ name: 'search-user' }" waves-fixed active class="active"
                    >Search User
                </mdb-nav-item>
                
            </mdb-navbar-nav>
        </mdb-navbar-toggler>


    </mdb-navbar>
</template>

<script>
    import {
        mdbNavbar,
        mdbNavItem,
        mdbNavbarNav,
        mdbNavbarToggler
    } from "mdbvue";

    export default {
        name: 'Header',
        components: {
            mdbNavbar,
            mdbNavItem,
            mdbNavbarNav,
            mdbNavbarToggler
        }
    }
</script>